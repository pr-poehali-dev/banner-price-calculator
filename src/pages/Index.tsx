import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

const materials = [
  { id: 'china', name: 'Китай', price: 170, days: '1-2 дня', description: 'Бюджетный вариант для временных баннеров' },
  { id: 'korea', name: 'Корея', price: 235, days: '2-3 дня', description: 'Оптимальное соотношение цена-качество' },
  { id: 'cast', name: 'Литой', price: 300, days: '3-4 дня', description: 'Премиум качество для долговечного использования' },
  { id: 'blackout', name: 'Блэкаут', price: 300, days: '3-4 дня', description: 'Не просвечивает, идеален для двусторонней печати' },
  { id: 'mesh', name: 'Сетка', price: 350, days: '2-3 дня', description: 'Для уличных баннеров с сильным ветром' },
  { id: 'translucent', name: 'Транслюцент', price: 600, days: '5-7 дней (под заказ)', description: 'Светопропускающий материал для подсветки' },
];

const Index = () => {
  const [selectedMaterial, setSelectedMaterial] = useState('korea');
  const [width, setWidth] = useState(3);
  const [height, setHeight] = useState(2);
  const [quantity, setQuantity] = useState(1);
  const [activeSection, setActiveSection] = useState('calculator');
  const [withEyelets, setWithEyelets] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    email: '',
    comment: ''
  });

  const material = materials.find(m => m.id === selectedMaterial);
  const area = width * height;
  const perimeter = 2 * (width + height);
  const eyeletsCount = Math.ceil(perimeter / 0.2);
  const eyeletsPrice = withEyelets ? eyeletsCount * 20 : 0;
  const materialPrice = material ? area * material.price * quantity : 0;
  const totalPrice = materialPrice + (withEyelets ? eyeletsPrice * quantity : 0);

  const portfolioItems = [
    { title: 'Рекламный баннер 6×3м', category: 'Корея', image: '🏢' },
    { title: 'Выставочный стенд', category: 'Литой', image: '🎨' },
    { title: 'Уличная реклама', category: 'Сетка', image: '🌆' },
    { title: 'Витрина магазина', category: 'Транслюцент', image: '✨' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Icon name="Printer" size={24} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
                  PrintCalc
                </span>
                <span className="text-xs text-gray-600 font-medium">
                  Калькулятор печати баннера
                </span>
              </div>
            </div>
            <div className="hidden md:flex gap-6">
              {[
                { id: 'calculator', label: 'Калькулятор', icon: 'Calculator' },
                { id: 'materials', label: 'Материалы', icon: 'Layers' },
                { id: 'portfolio', label: 'Портфолио', icon: 'Image' },
                { id: 'contacts', label: 'Контакты', icon: 'Phone' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  <Icon name={item.icon as any} size={18} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {activeSection === 'calculator' && (
        <section className="container mx-auto px-4 py-16 animate-fade-in">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Калькулятор печати
              </span>
            </h1>
            <p className="text-xl text-gray-600">Рассчитайте стоимость за 30 секунд</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 shadow-2xl border-0 bg-white/70 backdrop-blur-sm animate-scale-in">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Settings" className="text-primary" />
                Параметры заказа
              </h2>

              <div className="space-y-6">
                <div>
                  <Label className="text-lg font-semibold mb-4 block">Выберите материал</Label>
                  <RadioGroup value={selectedMaterial} onValueChange={setSelectedMaterial}>
                    <div className="grid gap-3">
                      {materials.map(mat => (
                        <label
                          key={mat.id}
                          className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-[1.02] ${
                            selectedMaterial === mat.id
                              ? 'border-primary bg-gradient-to-r from-primary/10 to-secondary/10 shadow-lg'
                              : 'border-gray-200 hover:border-primary/50'
                          }`}
                        >
                          <RadioGroupItem value={mat.id} id={mat.id} />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold">{mat.name}</span>
                              <span className="text-primary font-bold">{mat.price} ₽/м²</span>
                            </div>
                            <p className="text-sm text-gray-600">{mat.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="width" className="text-base font-semibold">Ширина (м)</Label>
                    <Input
                      id="width"
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={width}
                      onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                      className="mt-2 text-lg h-12 border-2 focus:border-primary"
                    />
                  </div>
                  <div>
                    <Label htmlFor="height" className="text-base font-semibold">Высота (м)</Label>
                    <Input
                      id="height"
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={height}
                      onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                      className="mt-2 text-lg h-12 border-2 focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="quantity" className="text-base font-semibold">Количество (шт)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="mt-2 text-lg h-12 border-2 focus:border-primary"
                  />
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Label className="text-lg font-semibold mb-4 block">Дополнительные опции</Label>
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-primary/50 cursor-pointer transition-all">
                      <Checkbox
                        checked={withEyelets}
                        onCheckedChange={(checked) => setWithEyelets(checked as boolean)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold">Люверсы</span>
                          <span className="text-primary font-bold">20 ₽ за 20 см</span>
                        </div>
                        <p className="text-sm text-gray-600">Металлические кольца по периметру для крепления</p>
                        {withEyelets && (
                          <p className="text-sm text-accent font-semibold mt-2">
                            ~{eyeletsCount} шт × 20 ₽ = {eyeletsPrice.toLocaleString('ru-RU')} ₽
                          </p>
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-6">
              <Card className="p-8 shadow-2xl border-0 bg-gradient-to-br from-primary to-secondary text-white animate-scale-in">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="Calculator" />
                  Итого
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-lg">
                    <span className="opacity-90">Материал:</span>
                    <span className="font-bold">{material?.name}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg">
                    <span className="opacity-90">Площадь:</span>
                    <span className="font-bold">{area.toFixed(2)} м²</span>
                  </div>
                  <div className="flex justify-between items-center text-lg">
                    <span className="opacity-90">Количество:</span>
                    <span className="font-bold">{quantity} шт</span>
                  </div>
                  {withEyelets && (
                    <div className="flex justify-between items-center text-lg">
                      <span className="opacity-90">Люверсы:</span>
                      <span className="font-bold">{(eyeletsPrice * quantity).toLocaleString('ru-RU')} ₽</span>
                    </div>
                  )}
                  <div className="h-px bg-white/30 my-4"></div>
                  <div className="flex justify-between items-center text-3xl font-extrabold">
                    <span>Стоимость:</span>
                    <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>

                <Button 
                  onClick={() => setShowOrderForm(true)}
                  className="w-full mt-8 h-14 text-lg font-bold bg-white text-primary hover:bg-white/90 shadow-xl transition-all hover:scale-105"
                >
                  <Icon name="Send" className="mr-2" />
                  Оформить заказ
                </Button>
              </Card>

              <Card className="p-6 shadow-xl border-0 bg-white/70 backdrop-blur-sm animate-scale-in">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Срок изготовления</h3>
                    <p className="text-2xl font-bold text-primary">{material?.days}</p>
                    <p className="text-sm text-gray-600 mt-2">Готовность к отправке после подтверждения макета</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'materials' && (
        <section className="container mx-auto px-4 py-16 animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Материалы для печати
            </h2>
            <p className="text-xl text-gray-600">Выбирайте лучшее для вашего проекта</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {materials.map((mat, idx) => (
              <Card
                key={mat.id}
                className="p-6 shadow-xl border-0 bg-white/70 backdrop-blur-sm hover:scale-105 transition-all animate-scale-in cursor-pointer"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">{mat.name}</h3>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                    {mat.price}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{mat.description}</p>
                <div className="flex items-center gap-2 text-accent font-semibold">
                  <Icon name="Clock" size={18} />
                  <span>{mat.days}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {activeSection === 'portfolio' && (
        <section className="container mx-auto px-4 py-16 animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Примеры работ
            </h2>
            <p className="text-xl text-gray-600">Наши лучшие проекты</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {portfolioItems.map((item, idx) => (
              <Card
                key={idx}
                className="overflow-hidden shadow-xl border-0 bg-white/70 backdrop-blur-sm hover:scale-105 transition-all animate-scale-in cursor-pointer group"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform">
                  {item.image}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.category}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {activeSection === 'contacts' && (
        <section className="container mx-auto px-4 py-16 animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Контакты
            </h2>
            <p className="text-xl text-gray-600">Свяжитесь с нами удобным способом</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {[
              { icon: 'Phone', title: 'Телефон', value: '+7 (983) 465-75-56', link: 'tel:+79834657556' },
              { icon: 'Mail', title: 'Email', value: 'printcalc@mail.ru', link: 'mailto:printcalc@mail.ru' },
              { icon: 'MapPin', title: 'Адрес', value: 'г. Иркутск, ул. Лыткина 66', link: '#' },
            ].map((contact, idx) => (
              <Card
                key={idx}
                className="p-8 shadow-xl border-0 bg-white/70 backdrop-blur-sm hover:scale-105 transition-all animate-scale-in text-center cursor-pointer"
                style={{ animationDelay: `${idx * 100}ms` }}
                onClick={() => window.location.href = contact.link}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name={contact.icon as any} size={28} className="text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{contact.title}</h3>
                <p className="text-gray-600">{contact.value}</p>
              </Card>
            ))}
          </div>

          <Card className="max-w-4xl mx-auto p-8 shadow-xl border-0 bg-white/70 backdrop-blur-sm animate-scale-in">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                <Icon name="Building2" size={28} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Реквизиты компании
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p className="text-lg">
                    <span className="font-semibold">ИП Аленова Клавдия Александровна</span>
                  </p>
                  <p className="text-base">
                    <span className="text-gray-600">ОГРН:</span> <span className="font-mono font-semibold">325385000102143</span>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>
      )}

      {showOrderForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl border-0 bg-white animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Оформление заказа
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowOrderForm(false)}
                className="rounded-full hover:bg-gray-100"
              >
                <Icon name="X" size={24} />
              </Button>
            </div>

            <div className="mb-6 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <h3 className="font-bold text-lg mb-3">Детали заказа:</h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-600">Материал:</span> <span className="font-semibold">{material?.name}</span></p>
                <p><span className="text-gray-600">Размер:</span> <span className="font-semibold">{width} × {height} м ({area.toFixed(2)} м²)</span></p>
                <p><span className="text-gray-600">Количество:</span> <span className="font-semibold">{quantity} шт</span></p>
                {withEyelets && <p><span className="text-gray-600">Люверсы:</span> <span className="font-semibold">Да (~{eyeletsCount} шт)</span></p>}
                <p className="text-lg pt-2 border-t border-gray-200"><span className="text-gray-600">Итого:</span> <span className="font-bold text-primary">{totalPrice.toLocaleString('ru-RU')} ₽</span></p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-base font-semibold">Имя *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Как к вам обращаться?"
                  value={orderForm.name}
                  onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                  className="mt-2 h-12 border-2 focus:border-primary"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-base font-semibold">Телефон *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={orderForm.phone}
                  onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                  className="mt-2 h-12 border-2 focus:border-primary"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-base font-semibold">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={orderForm.email}
                  onChange={(e) => setOrderForm({...orderForm, email: e.target.value})}
                  className="mt-2 h-12 border-2 focus:border-primary"
                />
              </div>

              <div>
                <Label htmlFor="comment" className="text-base font-semibold">Комментарий к заказу</Label>
                <textarea
                  id="comment"
                  placeholder="Дополнительные пожелания, детали..."
                  value={orderForm.comment}
                  onChange={(e) => setOrderForm({...orderForm, comment: e.target.value})}
                  className="w-full mt-2 p-3 border-2 rounded-lg focus:border-primary focus:outline-none resize-none"
                  rows={4}
                />
              </div>

              <div className="space-y-3">
                <Button
                  onClick={async () => {
                    try {
                      const orderData = {
                        name: orderForm.name,
                        phone: orderForm.phone,
                        email: orderForm.email,
                        comment: orderForm.comment,
                        material: material?.name,
                        size: `${width} × ${height} м`,
                        area: area.toFixed(2),
                        quantity: quantity,
                        eyelets: withEyelets,
                        eyelets_count: eyeletsCount,
                        total_price: totalPrice
                      };

                      const response = await fetch('https://functions.poehali.dev/453893aa-e591-4e74-961d-956fcaaec4c1', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(orderData)
                      });

                      if (response.ok) {
                        alert('✅ Заявка успешно отправлена на email!');
                        setShowOrderForm(false);
                        setOrderForm({ name: '', phone: '', email: '', comment: '' });
                      } else {
                        const error = await response.json();
                        alert('⚠️ Ошибка отправки: ' + (error.error || 'Попробуйте позже'));
                      }
                    } catch (err) {
                      alert('⚠️ Ошибка соединения. Попробуйте еще раз.');
                    }
                  }}
                  disabled={!orderForm.name || !orderForm.phone}
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icon name="Mail" className="mr-2" />
                  Отправить на Email
                </Button>

                <Button
                  onClick={() => {
                    const message = `🎨 Новый заказ на баннер!\n\n` +
                      `👤 Имя: ${orderForm.name}\n` +
                      `📞 Телефон: ${orderForm.phone}\n` +
                      `${orderForm.email ? `📧 Email: ${orderForm.email}\n` : ''}` +
                      `\n📋 Детали заказа:\n` +
                      `• Материал: ${material?.name}\n` +
                      `• Размер: ${width} × ${height} м (${area.toFixed(2)} м²)\n` +
                      `• Количество: ${quantity} шт\n` +
                      `${withEyelets ? `• Люверсы: Да (~${eyeletsCount} шт)\n` : ''}` +
                      `\n💰 Итого: ${totalPrice.toLocaleString('ru-RU')} ₽\n` +
                      `${orderForm.comment ? `\n💬 Комментарий: ${orderForm.comment}` : ''}`;
                    
                    const telegramUrl = `https://t.me/+79834657556?text=${encodeURIComponent(message)}`;
                    window.open(telegramUrl, '_blank');
                  }}
                  disabled={!orderForm.name || !orderForm.phone}
                  variant="outline"
                  className="w-full h-14 text-lg font-bold border-2 border-primary text-primary hover:bg-primary/5 shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icon name="Send" className="mr-2" />
                  Отправить в Telegram
                </Button>
              </div>

              <p className="text-sm text-gray-600 text-center">
                Нажимая на кнопку, вы будете перенаправлены в WhatsApp для подтверждения заказа
              </p>
            </div>
          </Card>
        </div>
      )}

      <footer className="bg-white/80 backdrop-blur-lg border-t border-purple-100 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>© 2024 PrintCalc. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;