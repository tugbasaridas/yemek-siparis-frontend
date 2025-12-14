# Yemek Sipariş Uygulaması - Frontend

Bu repository, Yemek Sipariş Uygulaması'nın frontend (React) tarafını içermektedir.
Uygulama, kullanıcıların ürünleri görüntüleyip sepete ekleyerek sipariş
oluşturabildiği; admin kullanıcıların ise siparişleri görüntüleyebildiği,ürünleri ekleyip,güncelleyip,silebildiği
bir yapı sunmaktadır.

## Kullanılan Teknolojiler
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Context API
- React Hot Toast

## Özellikler
- Kullanıcı kayıt ve giriş işlemleri
- Rol bazlı arayüz (müşteri / admin)
- Ürün listeleme ve filtreleme
- Sepet yönetimi
- Sipariş oluşturma ve sipariş görüntüleme
- Toast bildirimleri ile kullanıcıya geri bildirim sağlanması

## Bildirim Sistemi
Kullanıcı deneyimini artırmak amacıyla işlem sonuçları (başarılı kayıt,
hatalı giriş, form doğrulamaları vb.) toast bildirimleri ile kullanıcıya
anlık olarak iletilmektedir.

## Çalıştırma
Projeyi lokal ortamda çalıştırmak için aşağıdaki adımlar izlenebilir:

```bash
npm install
npm run dev
