sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 443
sudo iptables -t nat -A PREROUTING -p tcp --dport 443 -j REDIRECT --to-port 80
#포트 확인
#sudo iptables -t nat -L PREROUTING
# 80으로 들어오는 모든 패킷을 8080으로 리다이렉트 처리해버립니다

