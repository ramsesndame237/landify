# KIM PRO frontend

## auto checkout
Changes in this directory will we auto checked out to the Webservers page:

https://vmd86703.contaboserver.net/kim_pro_frontend/

## password protection

To secure the page against unauthorized access, I created a .htaccess file and a password file for the page.
You will find the credentials in the KeePass

## push to server

```shell
$ git push
Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Delta compression using up to 8 threads
Compressing objects: 100% (1/1), done.
Writing objects: 100% (2/2), 223 bytes | 111.00 KiB/s, done.
Total 2 (delta 0), reused 1 (delta 0), pack-reused 0
remote: hostname=vmd86703:0=hooks/post-receive:PWD=/var/www/html/kim_pro_frontend::GIT_DIR=.
remote: From /home/git/kim_pro_frontend
remote:    7fe1577..1303608  master     -> origin/master
remote: Updating 7fe1577..1303608
remote: Fast-forward
remote:  hello_raoul | 0
remote:  1 file changed, 0 insertions(+), 0 deletions(-)
remote:  delete mode 100644 hello_raoul
remote: errorlevel: 0
To kim_pro_git:kim_pro_frontend.git
   7fe1577..1303608  master -> master
$
```

## commands

Tell rebase strategy

> git config pull.rebase false

Keep an eye on this variable, if the server sets it, the
> GIT_DIR=.git/

> git update-server-info
