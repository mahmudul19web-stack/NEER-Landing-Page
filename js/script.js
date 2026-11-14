// NEER ওয়েবসাইটের প্রয়োজনীয় JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // ফুটারে চলতি বছর দেখানো
  document.getElementById('year').textContent = new Date().getFullYear();

  // মোবাইল মেনু খোলা ও বন্ধ করা
  const menuButton = document.getElementById('menuButton');
  const nav = document.getElementById('nav');
  menuButton.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });

  // অর্ডারের পরিমাণ বাড়ানো ও কমানো
  const quantity = document.getElementById('quantity');
  document.getElementById('minus').addEventListener('click', () => {
    quantity.value = Math.max(1, Number(quantity.value || 1) - 1);
  });
  document.getElementById('plus').addEventListener('click', () => {
    quantity.value = Math.min(99, Number(quantity.value || 1) + 1);
  });

  // বাংলাদেশি মোবাইল নম্বর যাচাই এবং WhatsApp-এ অর্ডার পাঠানো
  document.getElementById('orderForm').addEventListener('submit', event => {
    event.preventDefault();

    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim().replace(/[\s-]/g, '');
    const address = document.getElementById('customerAddress').value.trim();
    const count = Number(quantity.value);
    const phonePattern = /^(?:\+?88)?01[3-9][0-9]{8}$/;
    const message = document.getElementById('formMessage');

    if (!phonePattern.test(phone)) {
      message.textContent = 'সঠিক বাংলাদেশি মোবাইল নম্বর লিখুন। উদাহরণ: 01998572019';
      message.style.color = '#b42318';
      document.getElementById('customerPhone').focus();
      return;
    }
    if (!Number.isInteger(count) || count < 1 || count > 99) {
      message.textContent = '১ থেকে ৯৯-এর মধ্যে সঠিক পরিমাণ লিখুন।';
      message.style.color = '#b42318';
      quantity.focus();
      return;
    }

    const orderText = `NEER অর্ডার\nনাম: ${name}\nমোবাইল: ${phone}\nঠিকানা: ${address}\nপরিমাণ: ${count} বোতল`;
    const whatsappURL = `https://wa.me/8801998572019?text=${encodeURIComponent(orderText)}`;
    window.open(whatsappURL, '_blank', 'noopener');
    message.textContent = 'আপনার অর্ডারের তথ্য WhatsApp-এ পাঠানোর জন্য প্রস্তুত হয়েছে।';
    message.style.color = '#245b3b';
  });
});
