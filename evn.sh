# #!: 这两个字符（"shebang"）告诉系统这是一个脚本文件。/bin/bash: 这是 Bash shell 解释器的路径。
#重要性：它允许你直接运行脚本，而不需要显式调用解释器。确保脚本使用正确的 shell 或解释器执行。
#变体：#!/bin/sh: 使用标准 shell  #!/usr/bin/python: 用于 Python 脚本 #!/usr/bin/env bash: 更具可移植性的 Bash 脚本声明
#使用示例：
#这里有一个简单的 Bash 脚本示例：
#在这个脚本中，#!/bin/bash 确保它使用 Bash 解释器执行。
#要使用这个脚本：
#将内容保存到文件（如 hello.sh）
#使用 chmod +x hello.sh 使其可执行
#运行 ./hello.sh
#记住，#!/bin/bash 只在类 Unix 系统（如 Linux 或 macOS）中有效。在 Windows 中，它会被忽略。


#!/bin/bash
#Crontab_file 定义了个路径变量，看着后面没有用到
#Crontab_file="/usr/bin/crontab"

# 检查是否为 root 用户
check_root() {
    [[ $EUID != 0 ]] && echo "错误: 当前非ROOT账号(或没有ROOT权限), 无法继续操作, 请更换ROOT账号或使用 sudo su 命令获取临时ROOT权限。" && exit 1
}

# 安装依赖环境和全节点
install_env_and_full_node() {
    check_root
    sudo apt update && sudo apt upgrade -y
    #快速设置一个开发环境，安装常用的开发工具和实用程序。clang: C、C++和Objective-C编译器 pkg-config: 编译应用程序和库时使用的helper工具 libssl-dev: SSL开发库 jq: 命令行 JSON 处理器 build-essential: 包含编译软件所需的基本工具 make: 项目构建工具 ncdu: NCurses磁盘使用分析器 -y: 自动回答 yes 到所有提示，允许非交互式安装
    sudo apt install curl tar wget clang pkg-config libssl-dev jq build-essential git make ncdu unzip zip docker.io -y
    
    #安装docker-compose
    VERSION=$(curl --silent https://api.github.com/repos/docker/compose/releases/latest | grep -Po '"tag_name": "\K.*\d')
    DESTINATION=/usr/local/bin/docker-compose
    sudo curl -L https://github.com/docker/compose/releases/download/${VERSION}/docker-compose-$(uname -s)-$(uname -m) -o $DESTINATION
    sudo chmod 755 $DESTINATION

    #安装npm
    sudo apt-get install npm -y
    #安装yarn
    sudo npm install n -g
    sudo n stable
    sudo npm i -g yarn
    
    #拉取github上项目
    git clone https://github.com/CATProtocol/cat-token-box
    #拉取获取实时费率的js文件
    git clone https://github.com/jike912/shstudy/blob/main/parse_ts.js
    #将该文件移动到cat-token-box的/packages/cli目录下
    mv parse_ts.js cat-token-box/packages/cli
    cd cat-token-box
    
    #yarn 安装编译项目
    sudo yarn install
    sudo yarn build

    cd ./packages/tracker/
    sudo chmod 777 docker/data
    sudo chmod 777 docker/pgdata
    #运行 postgresql and bitcoind
    sudo docker-compose up -d

    #运行tracker service 在项目根目录下构建docker镜像
    cd ../../
    sudo docker build -t tracker:latest .
    sudo docker run -d \
        --name tracker \
        --add-host="host.docker.internal:host-gateway" \
        -e DATABASE_HOST="host.docker.internal" \
        -e RPC_HOST="host.docker.internal" \
        -p 3000:3000 \
        tracker:latest

    #以下内容输入到项目下的config.json文件中    
    echo '{
      "network": "fractal-mainnet",
      "tracker": "http://127.0.0.1:3000",
      "dataDir": ".",
      "maxFeeRate": 30,
      "rpc": {
          "url": "http://127.0.0.1:8332",
          "username": "bitcoin",
          "password": "opcatAwesome"
      }
    }' > ~/cat-token-box/packages/cli/config.json


    #将下面的mint cat代币的脚本程序输出到/cat-token-box/packages/cli 的mint_script.sh文件中
    echo '#!/bin/bash   
    command="sudo yarn cli mint -i 45ee725c2c5993b3e4d308842d87e973bf1951f5f7a804b21e4dd964ecd12d6b_0 5"
    #循环执行mint 代币
    while true; do
        $command

        if [ $? -ne 0 ]; then
            echo "命令执行失败，退出循环"
            exit 1
        fi

        sleep 1
    done' > ~/cat-token-box/packages/cli/mint_script.sh
    chmod +x ~/cat-token-box/packages/cli/mint_script.sh
}


# 创建钱包
create_wallet() {
  echo -e "\n"
  cd ~/cat-token-box/packages/cli
  sudo yarn cli wallet create
  echo -e "\n"
  sudo yarn cli wallet address
  echo -e "请保存上面创建好的钱包地址、助记词"
}

# 启动 mint 并设置 gas 费用
start_mint_cat() {
  read -p "请输入想要mint的gas: " newMaxFeeRate
  sed -i "s/\"maxFeeRate\": [0-9]*/\"maxFeeRate\": $newMaxFeeRate/" ~/cat-token-box/packages/cli/config.json
  cd ~/cat-token-box/packages/cli
  bash ~/cat-token-box/packages/cli/mint_script.sh
}


#输入代币的tokenId开始以实时费率mint某个代币
start_mint_onecoin(){
#!/bin/bash
 确保已安装 Node.js 和 TypeScript
if ! command -v node &> /dev/null || ! command -v npm &> /dev/null
then
    echo "Node.js 或 npm 未安装"
    exit 1
fi

# 安装 TypeScript（如果尚未安装）
npm install -g typescript

# TypeScript 文件路径
TS_FILE="~/cat-token-box/packages/cli/src/common/apis-rpc.ts"

# 使用 Node.js 脚本解析 TypeScript 文件
RPC_FEE_RATE=$(node parse_ts.js "$TS_FILE" "rpc_getfeeRate")

# 检查是否成功提取值
if [ -n "$RPC_FEE_RATE" ]; then
    echo "rpc_getfeeRate 的值是: $RPC_FEE_RATE"
else
    echo "无法找到 rpc_getfeeRate 的值"
    exit 1
fi
echo $RPC_FEE_RATE
    echo '#!/bin/bash   
    read -p "请输入想要mint的tokenId: " tokenId
    read -p "请输入一次mint的数量amount: " amount

    command="sudo yarn cli mint -i $tokenId $amount --$RPC_FEE_RATE"
    #循环执行mint 代币
    while true; do
        $command

        if [ $? -ne 0 ]; then
            echo "命令执行失败，退出循环"
            exit 1
        fi

        sleep 1
    # > 覆盖之前的文件  >>追加到之前的文件中
    done' > ~/cat-token-box/packages/cli/mint_script.sh
    chmod +x ~/cat-token-box/packages/climint_script.sh



}

# 查看节点同步日志
check_node_log() {
  docker logs -f --tail 100 tracker
}

# 查看钱包余额
check_wallet_balance() {
#切换到root根目录下项目的cli的文件目录下~表示根目录
  cd ~/cat-token-box/packages/cli
  sudo yarn cli wallet balances
}

#设置最大gas
set_max_feerate(){
read -p "请输入想要mint的gas: " newMaxFeeRate
sed -i "s/\"maxFeeRate\": [0-9]*/\"maxFeeRate\": $newMaxFeeRate/" ~/cat-token-box/packages/cli/config.json
}

# 显示主菜单
echo -e "
1. 安装依赖环境和全节点
2. 创建钱包
3. 开始 mint cat
4. 开始实时gas mint 新的代币
5. 查看钱包余额
6. 查看节点同步日志
7.设置最大gas
"

# 获取用户选择并执行相应操作
read -e -p "请输入您的选择: " num
case "$num" in
1)
    install_env_and_full_node
    ;;
2)
    create_wallet
    ;;
3)
    start_mint_cat
    ;;
4)
    start_mint_onecoin
    ;;
5)
    check_wallet_balance
    ;;
6)
    check_node_log
    ;; 

7)
    set_max_feerate
    ;;
*)
    echo "错误: 请输入有效的数字。"
    ;;
esac


































