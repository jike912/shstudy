Centos与Ubuntu的使用习惯和命令上还是有很多的不同，下面简单列举一下：

         1.centos中新建的非root用户是没有sudo的权限的，如果需要使用sudo权限必须在/etc/sudoers 中加入账户和权限，所以切换到root账号的时候只需要输入：su,加入root账号的密码即可。

         在Ubuntu中，一般使用sudo+命令，如果是第一次使用会提示输入当前用户的密码（而不是root的密码） 切换到root用户 sudo -i

        2.在线安装软件中，centos使用的是yum命令，而ubuntu中使用的是apt-get命令。除此之外yum中还有一个从软件源中搜索摸个软件的方法yum search +软件名

                                     RedHat(Centos)                        Ubuntu(Debian)      
任务
                                       服务管理(以apache为例)
启动服务                       service httpd start                          /etc/init.d/apache start
停止服务                       service httpd stop                           /etc/init.d/apache stop
随系统启动自动运行              chkconfig httpd on                           update-rc.d apachedefaults 
禁止启动自动运行                chkconfig httpd off                          update-rc.d apache purge
                                             基本信息

软件包后缀                    *.rpm                                         *.deb
软件源配置文件                /etc/yum.conf                                 /etc/apt/sources.list

                                 安装、删除、升级软件包
更新软件包列表                每次运行yum时自动更新                           apt-get update
从软件仓库安装软              yum install package                           apt-get install package       
安装已下载的软件包            yu install pkg.rpm或rpm -ivh pkg.rpm                             dpkg -i pkg.deb
                           

删除软件包                   yum -e package                                 apt-get remove package     
软件包升级测试               yum check-update                               apt-get -s update  apt-get -s dist-update
升级件包                     yum update或rpm - Uh [args]                    apt-get upgrade
升级整个系统                yum upgrade                                     apt-get dist-upgrade  
github
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
ssh 服务器ip 然后输入用户名和密码连接远程服务器
pwd 查看所在目录的位置
ifconfig查看网络设备的信息 查看到有eth0网卡就行
free -h检查服务器下的内存是否足够
df -lh检查磁盘空间是否足够
mkdir code新建目录
cd code/ 切换目录
git clone https://GitHub.com/....拉取代码
du -sh * 进入到目录查看项目占用多少空间
cat README.md 查看项目介绍
uname -a查看系统版本
查看Ubuntu版本： lsb_release -a
yum install java-1.8.0-openjdk* -y用centos自带软件管理器yum安装java
java -version查看java版本
which java查看java程序放在哪了
wget https://mirror....centos用wget下载文件
tar -zxvf apache-maven-3.8.2-bin.tar.gz 解压压缩文件
/apache-maven-3.8.2/bin/mvn --help 得到可执行的mvn二进制文件，构建命令忘了用help
find -name ‘*jar*’ 查找maven构建成功的jar包在哪里
cp ./target/code-nav-mp-server-0.0..jar ./ 太难找了，用cp命令将jar包复制到外面
ls 查看一下
mv code-nav-mp-server-0.0.l.jar code-nav.jar 名字太长，改个名称
ls改名成功后，查看一下
java -jar cod
nohup java -jar code-nav.jar 界面卡了，用nohup在后台执行程序
jobs 查看在后台是不是跑起来了
ps -ef查看是否有Java进程
ps -ef|grep 'java'只查看java的进程
netstat -ntlp查看java占用的端口
curl localhost:8082/dog 用curl访问占用的8082端口，报错了
cd logs/ 
ls
cat error.log 用cat命令查看错误日志，排版太乱了
tail -n 10 error.log用tail查看最新的10行日志，还是比较乱
sz error.log 用sz把日志下载到本地
vim pom.xml 修改下代码，:q!不保存直接退出 :wq保持并退出 i切换到insert插入模式
kill -9 %1用kill停止老进程
用向上箭头找到之前的命令重新构建，重新执行java程序
top 这次用top查看进程状态
每次执行输入几个命令挺麻烦，写个shell脚本
vim start.sh
./apache-maven-3.8.2/bin/mvn install
nohup java -jar code-nav.jar &
echo "success"     成功之后输出success
TKq+w36r/QLTLaFoAfzpWYIcikfd2Iikjs6F9saFQoiSiM5UR73rAtpxA9YLlYEVe99eKyrNRu+WdYdkLh7w8V1PU4lN1sBR
:wq保存并退出
ls查看到 start.sh
./start.sh   报没有权限， permission denied
chmod a+x start.sh 给文件加上可执行权限。ls查看一下，start.sh绿色表示可以执行了
history查看总共敲了多少命令
rm -rf /* 删除

查看是否已安装docker列表
yum list installed|grep docker
安装docker
yum -y install docker
复制
-y表示不询问安装，直到安装成功，安装完后再次查看安装列表 
启动docker
systemctl start docker
查看docker服务状态
systemctl status docker
# 删除镜像
docker rmi xxx,
# 删除容器
docker rm xxx
# 可在mysql后加指定版本号，不加默认最新版
docker pull mysql
# 查看镜像
docker images
# 查看启动的容器
docker ps
# 查看全部容器
docker ps -a
# 进入mysql
docker exec -it 容器id /bin/bash
mysql -u 用户名(默认root) -p

# 暂时关闭防火墙
systemctl stop firewalld
# 永久关闭防火墙
systemctl disable firewalld
# 重启防火墙命令
 systemctl restart firewalld


ubuntu下mint atomicals步骤
ubuntu安装nodejs
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt-get install -y nodejs
安装yarn
//sudo npm install -g yarn
安装git
sudo apt update
sudo apt install git

git clone https://github.com/atomicals/atomicals-js.git
cd atomicals-js
npm install && npm run build && npm run cli wallet-init && npm run cli mint-dft atom

ubuntu 安装docker
旧版本的 Docker 称为 docker 或者 docker-engine，使用以下命令卸载旧版本：
sudo apt-get remove docker \
               docker-engine \
               docker.io
使用 APT 安装
由于 apt 源使用 HTTPS 以确保软件下载过程中不被篡改。因此，我们首先需要添加使用 HTTPS 传输的软件包以及 CA 证书。
sudo apt-get update

sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# 官方源
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

然后，我们需要向 sources.list 中添加 Docker 软件源
# 官方源
echo \
"deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
$(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

安装 Docker
更新 apt 软件包缓存，并安装 docker-ce：
sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io

//使用脚本自动安装
在测试或开发环境中 Docker 官方为了简化安装流程，提供了一套便捷的安装脚本，Ubuntu 系统上可以使用这套脚本安装，另外可以通过 --mirror 选项使用国内源进行安装：
若你想安装测试版的 Docker, 请从 test.docker.com 获取脚本
# curl -fsSL test.docker.com -o get-docker.sh
curl -fsSL get.docker.com -o get-docker.sh
sudo sh get-docker.sh --mirror Aliyun
# sudo sh get-docker.sh --mirror AzureChinaCloud
执行这个命令后，脚本就会自动的将一切准备工作做好，并且把 Docker 的稳定(stable)版本安装在系统中。


启动 Docker
sudo systemctl enable docker
sudo systemctl start docker
建立 docker 组：
sudo groupadd docker
将当前用户加入 docker 组：
sudo usermod -aG docker $USER



docker命令
docker ps -a 查看所有docker容器
docker images 查看所有镜像
docker exec -it <容器名或id> bash  进入容器
exit 退出容器
docker stop 名称
docker start 名称
docker exec -it --name nocturne nocturne-setup auth
nocturne-setup logout

执行请求命令运行在服务器端，可以关电脑执行
tmux new -s 会话名称
输入命令 tmux ls 来查看当前还运行着的 tmux 会话
然后在tmux会话窗口执行命令，下次打开用下面的命令进入
tmux attach -t  会话名称
exit 命令:在tmux会话中的最后一个窗口内使用exit命令,会关闭当前窗口并自动销毁整个会话。
kill-session 命令:
在会话内:输入tmux kill-session 或 快捷键 Ctrl+b,然后按 : 输入 kill-session
在会话外:输入tmux kill-session -t 会话名称
快捷键Ctrl+b d:暂时将会话分离到后台,会话依然存在。
快捷键Ctrl+b &:强制关闭当前会话,不需要确认。


ierc-20 pow 挖矿教程
目前的ierc-m5是测试，可以先熟悉下流程
安装nodejs
curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs
node -v
npm -v
sudo apt install build-essential
远程下载项目
git clone https://github.com/IErcOrg/ierc-miner-js
ls查看目录
cd ierc-miner-js
sudo npm i -g yarn
yarn install
yarn cli wallet --set 钱包密钥
yarn cli mine 币名称 --account 钱包地址

  
安装go
sudo wget https://golang.google.cn/dl/go1.21.5.linux-amd64.tar.gz

sudo tar xfz go1.21.5.linux-amd64.tar.gz -C /usr/local

打开：
sudo vim /etc/profile
将以下内容追加到文件末尾
export GOROOT=/usr/local/go
export GOPATH=$HOME/gowork
export GOBIN=$GOPATH/bin
export PATH=$GOPATH:$GOBIN:$GOROOT/bin:$PATH
输入以下命令保存
:wq
使环境变量生效
source /etc/profile
如果只是这样做，在关闭终端后，重新打开环境变量又会失效，除了重新启动系统之外，可以在用户根目录的.bashrc

cd ~
sudo vim .bashrc
在文件末尾加入如下命令

source /etc/profile

查看环境是否搭建成功

go env
开启GO111MOUDLE和更改GOPROXY

go env -w GOPROXY="https://goproxy.cn"
go env -w GO111MODULE=on

./Powerc20Worker -privateKey a24d06de1b33fd684ef5bccd81e04eca116d0f64096d4ad7089aae983f4cbfc8 -contractAddress 0xca9b78435Be8267922E7Ac5cDE70401e7502c9cc -workerCount 5


vim ore.sh编写.sh 文件  
#!/bin/bash
for i in {1..100000}
do 
  ore --rpc https://solana-mainnet.g.alchemy.com/v2/2WmqiXDso9Y0SQjC9C_Cxsm2sftEmjie --keypair ~/.config/solana/id.json --priority-fee 10 mine --threads 10
done
授权chmod +x ore.sh  执行./ore.sh
可以 tmux new -s ore  打开服务器会话窗口后台执行./ore.sh  ore是会话名称 
while true; do output=$(ore --rpc xxxxxxxxxxxxx --keypair ~/.config/solana/id.json claim); if [[ $output == *"成功"* ]]; then echo "领取成功"; break; else echo "领取失败，重试中..."; fi; sleep 1; done
XXX换成自己的节点
