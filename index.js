const http = require('http');
const os = require('os');

// Sunucunun IP adresini al
function getServerIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // IPv4 adresi olup olmadığını kontrol et
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'IP adresi bulunamadı';
}

// HTTP sunucusunu oluştur
const server = http.createServer((req, res) => {
  const ipAddress = getServerIp();
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Sunucu IP Adresi: ${ipAddress}\n  Bu cicdtry repository'si ile 3 farklı ec2 instance'ı üzerinde load balancer ile çalışarak tek seferde 3 deploy yapıyorum ve websitemi 3 farklı instance üzerinden dağıtıyorum.`);
});

// Sunucuyu başlat
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});

