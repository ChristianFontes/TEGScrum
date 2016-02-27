sudo debconf-set-selections <<< 'mysql-server-5.5 mysql-server/root_password password rootpass'
sudo debconf-set-selections <<< 'mysql-server-5.5 mysql-server/root_password_again password rootpass'
sudo apt-get update
sudo apt-get -y install mysql-server-5.5

if [ ! -f /var/log/databasesetup ];
then
    echo "CREATE USER 'adminsails'@'localhost' IDENTIFIED BY 'passsails'" | mysql -uroot -prootpass
    echo "CREATE DATABASE scrumsails" | mysql -uroot -prootpass
    echo "GRANT ALL ON scrumsails.* TO 'adminsails'@'localhost'" | mysql -uroot -prootpass
    echo "flush privileges" | mysql -uroot -prootpass

    touch /var/log/databasesetup

    if [ -f /vagrant/data/initial.sql ];
    then
        mysql -uroot -prootpass scrumsails < /vagrant/data/initial.sql
    fi
fi