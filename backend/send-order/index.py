import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any
import os

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Бизнес-логика: Отправка заявки на заказ баннера на email
    Аргументы: event - запрос с данными заказа, context - контекст выполнения
    Возвращает: HTTP ответ с результатом отправки
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    # Получаем данные из запроса
    name = body_data.get('name', '')
    phone = body_data.get('phone', '')
    email = body_data.get('email', '')
    comment = body_data.get('comment', '')
    material = body_data.get('material', '')
    size = body_data.get('size', '')
    area = body_data.get('area', '')
    quantity = body_data.get('quantity', 1)
    eyelets = body_data.get('eyelets', False)
    eyelets_count = body_data.get('eyelets_count', 0)
    total_price = body_data.get('total_price', 0)
    
    # Формируем email
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'🎨 Новый заказ на баннер от {name}'
    msg['From'] = os.environ.get('SMTP_FROM_EMAIL', 'noreply@printcalc.ru')
    msg['To'] = 'printcalc@mail.ru'
    
    # HTML версия письма
    html_content = f'''
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #f5f3ff 0%, #fce7f3 100%); border-radius: 10px;">
          <h2 style="color: #9333ea; margin-bottom: 20px;">🎨 Новый заказ на баннер!</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
            <h3 style="color: #9333ea; margin-top: 0;">👤 Контактные данные:</h3>
            <p><strong>Имя:</strong> {name}</p>
            <p><strong>Телефон:</strong> {phone}</p>
            {f'<p><strong>Email:</strong> {email}</p>' if email else ''}
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
            <h3 style="color: #9333ea; margin-top: 0;">📋 Детали заказа:</h3>
            <p><strong>Материал:</strong> {material}</p>
            <p><strong>Размер:</strong> {size} ({area} м²)</p>
            <p><strong>Количество:</strong> {quantity} шт</p>
            {f'<p><strong>Люверсы:</strong> Да (~{eyelets_count} шт)</p>' if eyelets else ''}
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
            <h3 style="color: #9333ea; margin-top: 0;">💰 Стоимость:</h3>
            <p style="font-size: 24px; font-weight: bold; color: #9333ea; margin: 0;">{total_price:,} ₽</p>
          </div>
          
          {f'''<div style="background: white; padding: 20px; border-radius: 8px;">
            <h3 style="color: #9333ea; margin-top: 0;">💬 Комментарий:</h3>
            <p>{comment}</p>
          </div>''' if comment else ''}
        </div>
      </body>
    </html>
    '''
    
    # Текстовая версия письма (запасная)
    text_content = f'''
🎨 Новый заказ на баннер!

👤 Контактные данные:
Имя: {name}
Телефон: {phone}
{'Email: ' + email if email else ''}

📋 Детали заказа:
• Материал: {material}
• Размер: {size} ({area} м²)
• Количество: {quantity} шт
{'• Люверсы: Да (~' + str(eyelets_count) + ' шт)' if eyelets else ''}

💰 Стоимость: {total_price:,} ₽

{'💬 Комментарий: ' + comment if comment else ''}
    '''
    
    part1 = MIMEText(text_content, 'plain', 'utf-8')
    part2 = MIMEText(html_content, 'html', 'utf-8')
    
    msg.attach(part1)
    msg.attach(part2)
    
    # Отправляем email через SMTP
    smtp_host = os.environ.get('SMTP_HOST', 'smtp.yandex.ru')
    smtp_port = int(os.environ.get('SMTP_PORT', '465'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    
    if not smtp_user or not smtp_password:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'SMTP credentials not configured'}),
            'isBase64Encoded': False
        }
    
    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_password)
        server.send_message(msg)
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True, 'message': 'Order sent successfully'}),
        'isBase64Encoded': False
    }
