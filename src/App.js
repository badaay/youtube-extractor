import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

// Consolidated car data (simulating data read from a local source)
// In a real application, this would come from your Google Cloud Function + Firestore
const ALL_CAR_LISTINGS = [
  { id: '1', name: 'Kia Red', year: 2010, price: 'Rp 62,500,000', tax: 'Not specified', source: { name: 'ZAHRA MOTOR KLATEN', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=w5ccEBmT_X8', merk: 'Kia' },
  { id: '2', name: 'Vios Remo', year: 2010, price: 'Rp 56,500,000', tax: 'Not specified', source: { name: 'ZAHRA MOTOR KLATEN', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=w5ccEBmT_X8', merk: 'Toyota' },
  { id: '3', name: 'Avanza', year: 2004, price: 'Rp 68,500,000', tax: 'Not specified', source: { name: 'ZAHRA MOTOR KLATEN', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=w5ccEBmT_X8', merk: 'Toyota' },
  { id: '4', name: 'Baleno LGX New Model', year: 2003, price: 'Rp 72,500,000', tax: 'Not specified', source: { name: 'ZAHRA MOTOR KLATEN', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=w5ccEBmT_X8', merk: 'Suzuki' },
  { id: '5', name: 'Baleno', year: 2003, price: 'Rp 52,500,000', tax: 'Not specified', source: { name: 'ZAHRA MOTOR KLATEN', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=w5ccEBmT_X8', merk: 'Suzuki' },
  { id: '6', name: 'Vios G', year: 2003, price: 'Rp 5,500,000', tax: 'Not specified', source: { name: 'ZAHRA MOTOR KLATEN', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=w5ccEBmT_X8', merk: 'Toyota' },
  { id: '7', name: 'Silver car', year: 2001, price: 'Rp 68,500,000', tax: 'Not specified', source: { name: 'ZAHRA MOTOR KLATEN', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=w5ccEBmT_X8', merk: 'Unknown' },
  { id: '8', name: 'Proton Lotus Gen 2', year: 2012, price: 'Rp 57,500,000', tax: 'Not specified', source: { name: 'ZAHRA MOTOR KLATEN', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=w5ccEBmT_X8', merk: 'Proton' },
  { id: '9', name: 'Datsun Go Panca', year: 2016, price: 'Rp 69,500,000', tax: 'Not specified', source: { name: 'ZAHRA MOTOR KLATEN', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=w5ccEBmT_X8', merk: 'Datsun' },
  { id: '10', name: 'Karimun', year: 2009, price: 'Rp 45,500,000', tax: 'Not specified', source: { name: 'ZAHRA MOTOR KLATEN', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=w5ccEBmT_X8', merk: 'Suzuki' },
  { id: '11', name: 'Karimun Kilo', year: 2007, price: 'Rp 45,500,000', tax: 'Not specified', source: { name: 'ZAHRA MOTOR KLATEN', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=w5ccEBmT_X8', merk: 'Suzuki' },
  { id: '12', name: 'Honda Civic LX', year: 1988, price: 'Rp 21,500,000', tax: 'Not specified', source: { name: 'ZAHRA MOTOR KLATEN', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=w5ccEBmT_X8', merk: 'Honda' },
  { id: '13', name: 'Daihatsu Ayla X Automatic', year: 2013, price: 'Rp 85,900,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=YHXY7oxSADQ', merk: 'Daihatsu' },
  { id: '14', name: 'Daihatsu Xenia Xi VVTi Manual', year: 2011, price: 'Rp 89,900,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=YHXY7oxSADQ', merk: 'Daihatsu' },
  { id: '15', name: 'Toyota Agya G Automatic', year: 2015, price: 'Rp 95,900,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=YHXY7oxSADQ', merk: 'Toyota' },
  { id: '16', name: 'Toyota Kijang Super Astralong', year: 1991, price: 'Rp 32,900,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=YHXY7oxSADQ', merk: 'Toyota' },
  { id: '17', name: 'Suzuki Baleno DX Manual', year: 2002, price: 'Rp 40,000,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=YHXY7oxSADQ', merk: 'Suzuki' },
  { id: '18', name: 'Timor DOHC', year: 1997, price: 'Rp 34,000,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=YHXY7oxSADQ', merk: 'Timor' },
  { id: '19', name: 'Toyota Vios Limo Manual', year: 2004, price: 'Rp 47,000,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=YHXY7oxSADQ', merk: 'Toyota' },
  { id: '20', name: 'Kia Carens 2 Manual', year: 2004, price: 'Rp 58,000,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=YHXY7oxSADQ', merk: 'Kia' },
  { id: '21', name: 'Proton Gen 2 Campro Manual', year: 2010, price: 'Rp 52,900,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=YHXY7oxSADQ', merk: 'Proton' },
  { id: '22', name: 'Mitsubishi Outlander Sport Automatic', year: 2012, price: 'Rp 135,900,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=YHXY7oxSADQ', merk: 'Mitsubishi' },
  { id: '23', name: 'Datsun Go Plus Panca', year: 2014, price: 'Rp 77,900,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=YHXY7oxSADQ', merk: 'Datsun' },
  { id: '24', name: 'Suzuki APV SGX Manual', year: 2010, price: 'Rp 85,900,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=YHXY7oxSADQ', merk: 'Suzuki' },
  { id: '25', name: 'Toyota Avanza G VVTi Manual', year: 2006, price: 'Rp 85,900,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=YHXY7oxSADQ', merk: 'Toyota' },
  { id: '26', name: 'Ford Fiesta Automatic', year: 2011, price: 'Rp 89,900,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=YHXY7oxSADQ', merk: 'Ford' },
  { id: '27', name: 'Toyota Yaris E Manual', year: 2012, price: 'Rp 117,900,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=YHXY7oxSADQ', merk: 'Toyota' },
  { id: '28', name: 'Mitsubishi Galant Hiu Automatic', year: 2000, price: 'Rp 75,900,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=YHXY7oxSADQ', merk: 'Mitsubishi' },
  { id: '29', name: 'Toyota Etios Valco G Manual', year: 2015, price: 'Rp 105,900,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=YHXY7oxSADQ', merk: 'Toyota' },
  { id: '30', name: 'Mitsubishi T120 SS', year: 1994, price: 'Rp 27,900,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=YHXY7oxSADQ', merk: 'Mitsubishi' },
  { id: '31', name: 'Opel Blazer Montera', year: 1999, price: 'Rp 39,900,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=YHXY7oxSADQ', merk: 'Opel' },
  { id: '32', name: 'Toyota Calya G Manual', year: 2016, price: 'Rp 105,900,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=YHXY7oxSADQ', merk: 'Toyota' },
  { id: '33', name: 'All New Kia Rio Manual', year: 2011, price: 'Rp 99,900,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=YHXY7oxSADQ', merk: 'Kia' },
  { id: '34', name: 'Toyota Avanza G Automatic', year: 2015, price: 'Rp 114,900,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=YHXY7oxSADQ', merk: 'Toyota' },
  { id: '35', name: 'Toyota Avanza Veloz Manual', year: 2017, price: 'Rp 159,900,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=YHXY7oxSADQ', merk: 'Toyota' },
  { id: '36', name: 'Daihatsu Ayla', year: null, price: 'Rp 28,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=FOAY5Q8DXpo', merk: 'Daihatsu' },
  { id: '37', name: 'Daihatsu Rocky', year: null, price: 'Rp 179,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=FOAY5Q8DXpo', merk: 'Daihatsu' },
  { id: '38', name: 'Nissan X-Trail', year: 2021, price: 'Rp 99,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=FOAY5Q8DXpo', merk: 'Nissan' },
  { id: '39', name: 'Mercedes-Benz', year: 2003, price: 'Rp 69,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=FOAY5Q8DXpo', merk: 'Mercedes-Benz' },
  { id: '40', name: 'Toyota Innova', year: 2008, price: 'Rp 115,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=FOAY5Q8DXpo', merk: 'Toyota' },
  { id: '41', name: 'Mercedes-Benz ML320', year: null, price: 'Rp 70,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=FOAY5Q8DXpo', merk: 'Mercedes-Benz' },
  { id: '42', name: 'Honda Brio', year: null, price: 'Rp 110,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=FOAY5Q8DXpo', merk: 'Honda' },
  { id: '43', name: 'Toyota Vios', year: 2010, price: 'Rp 60,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=FOAY5Q8DXpo', merk: 'Toyota' },
  { id: '44', name: 'Toyota Vios', year: 2014, price: 'Rp 78,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=FOAY5Q8DXpo', merk: 'Toyota' },
  { id: '45', name: 'Honda Accord', year: 2008, price: 'Rp 99,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=FOAY5Q8DXpo', merk: 'Honda' },
  { id: '46', name: 'Honda Accord', year: null, price: 'Rp 15,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=FOAY5Q8DXpo', merk: 'Honda' },
  { id: '47', name: 'Nissan', year: 1999, price: 'Rp 55,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=FOAY5Q8DXpo', merk: 'Nissan' },
  { id: '48', name: 'Chery Adiputro', year: null, price: 'Rp 30,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=FOAY5Q8DXpo', merk: 'Chery' },
  { id: '49', name: 'Mercedes-Benz', year: null, price: 'Rp 30,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=FOAY5Q8DXpo', merk: 'Mercedes-Benz' },
  { id: '50', name: 'Suzuki Forsa', year: null, price: 'Rp 20,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=FOAY5Q8DXpo', merk: 'Suzuki' },
  { id: '51', name: 'Daihatsu Taruna', year: null, price: 'Rp 60,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=FOAY5Q8DXpo', merk: 'Daihatsu' },
  { id: '52', name: 'Suzuki Escudo', year: null, price: 'Rp 45,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=FOAY5Q8DXpo', merk: 'Suzuki' },
  { id: '53', name: 'Toyota Kijang', year: null, price: 'Rp 40,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=FOAY5Q8DXpo', merk: 'Toyota' },
  { id: '54', name: 'Toyota Kijang', year: 1994, price: 'Rp 40,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=FOAY5Q8DXpo', merk: 'Toyota' },
  { id: '55', name: 'Suzuki Vitara', year: null, price: 'Rp 50,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=FOAY5Q8DXpo', merk: 'Suzuki' },
  { id: '56', name: 'Suzuki Vitara', year: 1997, price: 'Rp 30,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=FOAY5Q8DXpo', merk: 'Suzuki' },
  { id: '57', name: 'Toyota Yaris', year: 2014, price: 'Rp 140,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=FOAY5Q8DXpo', merk: 'Toyota' },
  { id: '58', name: 'Toyota Yaris', year: 2015, price: 'Rp 120,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=FOAY5Q8DXpo', merk: 'Toyota' },
  { id: '59', name: 'Toyota Yaris Hiker', year: 2017, price: 'Rp 150,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=FOAY5Q8DXpo', merk: 'Toyota' },
  { id: '60', name: 'Toyota Yaris', year: 2012, price: 'Rp 100,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=FOAY5Q8DXpo', merk: 'Toyota' },
  { id: '61', name: 'Honda CR-V', year: 2004, price: 'Rp 80,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=FOAY5Q8DXpo', merk: 'Honda' },
  { id: '62', name: 'Mitsubishi T120SS', year: null, price: 'Rp 20,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=FOAY5Q8DXpo', merk: 'Mitsubishi' },
  { id: '63', name: 'Suzuki Ertiga', year: 2020, price: 'Rp 195,000,000', tax: 'Tax off', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=FOAY5Q8DXpo', merk: 'Suzuki' },
  { id: '64', name: 'Suzuki Karimun', year: null, price: 'Rp 50,500,000', tax: 'Not specified', source: { name: 'MJM', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=mObOnMn9vfU', merk: 'Suzuki' },
  { id: '65', name: 'Kijang LGX', year: 2003, price: 'Rp 72,000,000', tax: 'Not specified', source: { name: 'MJM', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=mObOnMn9vfU', merk: 'Toyota' },
  { id: '66', name: 'Kijang Super Long Nasmoko', year: 1996, price: 'Rp 33,000,000', tax: 'Not specified', source: { name: 'MJM', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=mObOnMn9vfU', merk: 'Toyota' },
  { id: '67', name: 'Suzuki Vitara 4x4', year: 1993, price: 'Rp 65,000,000', tax: 'Not specified', source: { name: 'MJM', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=mObOnMn9vfU', merk: 'Suzuki' },
  { id: '68', name: 'Kijang Rover GRX', year: 1994, price: 'Rp 26,500,000', tax: 'Not specified', source: { name: 'MJM', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=mObOnMn9vfU', merk: 'Toyota' },
  { id: '69', name: 'Kijang Grand Extra SGE', year: 1996, price: 'Rp 41,000,000', tax: 'Not specified', source: { name: 'MJM', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=mObOnMn9vfU', merk: 'Toyota' },
  { id: '70', name: 'Kijang Kapsul LX', year: 2003, price: 'Rp 55,000,000', tax: 'Not specified', source: { name: 'MJM', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=mObOnMn9vfU', merk: 'Toyota' },
  { id: '71', name: 'Toyota Kijang Super G', year: 1996, price: 'Rp 27,000,000', tax: 'Not specified', source: { name: 'MJM', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=mObOnMn9vfU', merk: 'Toyota' },
  { id: '72', name: 'Kijang Krista', year: 2004, price: 'Rp 76,500,000', tax: 'Not specified', source: { name: 'MJM', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=mObOnMn9vfU', merk: 'Toyota' },
  { id: '73', name: 'Kijang Kapsul LGX', year: 1999, price: 'Rp 53,500,000', tax: 'Not specified', source: { name: 'MJM', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=mObOnMn9vfU', merk: 'Toyota' },
  { id: '74', name: 'Kijang Kapsul LGX', year: 2002, price: 'Rp 76,500,000', tax: 'Not specified', source: { name: 'MJM', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=mObOnMn9vfU', merk: 'Toyota' },
  { id: '75', name: 'Kijang Kapsul SX', year: 2003, price: 'Rp 43,000,000', tax: 'Not specified', source: { name: 'MJM', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=mObOnMn9vfU', merk: 'Toyota' },
  { id: '76', name: 'Suzuki APV Blind Van', year: 2019, price: 'Rp 73,000,000', tax: 'Not specified', source: { name: 'MJM', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=mObOnMn9vfU', merk: 'Suzuki' },
  { id: '77', name: 'Daihatsu Feroza', year: 1995, price: 'Rp 34,000,000', tax: 'Not specified', source: { name: 'MJM', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=mObOnMn9vfU', merk: 'Daihatsu' },
  { id: '78', name: 'Kijang Rover GRX', year: 1994, price: 'Rp 27,000,000', tax: 'Not specified', source: { name: 'MJM', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=mObOnMn9vfU', merk: 'Toyota' },
  { id: '79', name: 'Suzuki Katana GX', year: 1996, price: 'Rp 48,000,000', tax: 'Not specified', source: { name: 'MJM', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=mObOnMn9vfU', merk: 'Suzuki' },
  { id: '80', name: 'Toyota Kijang Diesel Pickup', year: null, price: 'Rp 27,000,000', tax: 'Not specified', source: { name: 'MJM', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=mObOnMn9vfU', merk: 'Toyota' },
  { id: '81', name: 'Isuzu Panther', year: 1996, price: 'Rp 31,000,000', tax: 'Not specified', source: { name: 'MJM', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=mObOnMn9vfU', merk: 'Isuzu' },
  { id: '82', name: 'Toyota Camry Manual', year: 2002, price: 'Rp 39,000,000', tax: 'Not specified', source: { name: 'MJM', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=mObOnMn9vfU', merk: 'Toyota' },
  { id: '83', name: 'Toyota Innova', year: 2005, price: 'Rp 90,000,000', tax: 'Not specified', source: { name: 'MJM', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=mObOnMn9vfU', merk: 'Toyota' },
  { id: '84', name: 'Kijang Kapsul', year: 2004, price: 'Rp 53,000,000', tax: 'Not specified', source: { name: 'MJM', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=mObOnMn9vfU', merk: 'Toyota' },
  { id: '85', name: 'Innova', year: null, price: 'Rp 70,000,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Toyota' },
  { id: '86', name: 'Innova', year: 2011, price: 'Rp 140,000,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Toyota' },
  { id: '87', name: 'XL7', year: null, price: 'Rp 170,000,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Suzuki' },
  { id: '88', name: 'Jazz', year: null, price: 'Rp 180,000,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Honda' },
  { id: '89', name: 'Jazz', year: null, price: 'Rp 130,000,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Honda' },
  { id: '90', name: 'Expander', year: null, price: 'Rp 200,000,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Mitsubishi' },
  { id: '91', name: 'Agya Ayla', year: null, price: 'Rp 100,000,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Toyota' },
  { id: '92', name: 'Brio', year: null, price: 'Rp 100,000,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Honda' },
  { id: '93', name: 'Brio', year: null, price: 'Rp 110,000,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Honda' },
  { id: '94', name: 'Senia', year: 2004, price: 'Rp 68,000,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Daihatsu' },
  { id: '95', name: 'Senia', year: null, price: 'Rp 110,000,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Daihatsu' },
  { id: '96', name: 'Avega', year: 2012, price: 'Rp 95,000,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Hyundai' },
  { id: '97', name: 'Sigra', year: 2016, price: 'Price Negotiable', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Daihatsu' },
  { id: '98', name: 'Avanza', year: 2017, price: 'Rp 140,000,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Toyota' },
  { id: '99', name: 'Avanza All New', year: 2019, price: 'Rp 170,000,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Toyota' },
  { id: '100', name: 'Avanza Barong', year: null, price: 'Rp 100,000,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Toyota' },
  { id: '101', name: 'Picanto', year: 2013, price: 'Rp 80,000,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Kia' },
  { id: '102', name: 'Adiputro T 120 SS', year: 2000, price: 'Rp 35,000,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Chery' },
  { id: '103', name: 'Livina', year: null, price: 'Price Not Specified', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Nissan' },
  { id: '104', name: 'Etios Falco', year: null, price: 'Price Not Specified', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Toyota' },
  { id: '105', name: 'Kia Sorento Diesel', year: null, price: 'Rp 200,000,000+', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Kia' },
  { id: '106', name: 'Mobilio', year: null, price: 'Rp 70,000,000+', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Honda' },
  { id: '107', name: 'Ignis', year: null, price: 'Price Not Specified', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Suzuki' },
  { id: '108', name: 'CRV', year: 2018, price: 'Rp 319,000,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Honda' },
  { id: '109', name: 'Honda Genio', year: null, price: 'Rp 73,000,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Honda' },
  { id: '110', name: 'Mitsubishi Lancer', year: null, price: 'Rp 30,000,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Mitsubishi' },
  { id: '111', name: 'Panther Sporty', year: 1997, price: 'Rp 59,000,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Isuzu' },
  { id: '112', name: 'Vios', year: null, price: 'Price Not Specified', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Toyota' },
  { id: '113', name: 'Blazer', year: null, price: 'Rp 45,000,000', tax: 'Not specified', source: { name: 'Imam Arivin', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=hzicgvwETig', merk: 'Chevrolet' },
  { id: '114', name: 'Kijang Grand Extra', year: null, price: 'Rp 40,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Toyota' },
  { id: '115', name: 'Kijang Grand Extra', year: null, price: 'Rp 70,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Toyota' },
  { id: '116', name: 'Innova', year: null, price: 'Rp 70,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Toyota' },
  { id: '117', name: 'Innova', year: null, price: 'Rp 80,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Toyota' },
  { id: '118', name: 'Wuling Confero', year: null, price: 'Rp 90,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Wuling' },
  { id: '119', name: 'Levina', year: null, price: 'Rp 70,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Nissan' },
  { id: '120', name: 'Wuling Panther APV', year: null, price: 'Rp 50,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Wuling' },
  { id: '121', name: 'Hyundai', year: 2007, price: 'Rp 60,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Hyundai' },
  { id: '122', name: 'Double Cabin', year: null, price: 'Rp 85,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Ford' },
  { id: '123', name: 'Ford Ranger', year: 2014, price: 'Rp 180,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Ford' },
  { id: '124', name: 'Brio Matic', year: 2015, price: 'Rp 110,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Honda' },
  { id: '125', name: 'Brio Matic', year: null, price: 'Rp 50,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Honda' },
  { id: '126', name: 'Mercy Matic', year: null, price: 'Rp 70,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Mercedes-Benz' },
  { id: '127', name: 'Pajero', year: 2016, price: 'Rp 370,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Mitsubishi' },
  { id: '128', name: 'Daihatsu Sigra Matic', year: null, price: 'Rp 70,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Daihatsu' },
  { id: '129', name: 'Brio', year: 2018, price: 'Price Negotiable', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Honda' },
  { id: '130', name: 'Lancer', year: 1992, price: 'Rp 30,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Mitsubishi' },
  { id: '131', name: 'Mobilio', year: 2019, price: 'Rp 140,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Honda' },
  { id: '132', name: 'Chevrolet', year: 2009, price: 'Rp 100,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Chevrolet' },
  { id: '133', name: 'Avega', year: 2012, price: 'Rp 90,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Hyundai' },
  { id: '134', name: 'Outlander', year: 2012, price: 'Rp 130,700,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Mitsubishi' },
  { id: '135', name: 'Hyundai', year: 2007, price: 'Rp 80,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Hyundai' },
  { id: '136', name: 'Suzuki Exoper', year: null, price: 'Rp 80,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Suzuki' },
  { id: '137', name: 'APV', year: 2005, price: 'Rp 73,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Suzuki' },
  { id: '138', name: 'Avanza', year: null, price: 'Rp 78,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Toyota' },
  { id: '139', name: 'Avanza', year: 2013, price: 'Rp 119,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Toyota' },
  { id: '140', name: 'Avanza', year: 2009, price: 'Rp 90,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Toyota' },
  { id: '141', name: 'Avanza', year: 2005, price: 'Rp 78,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Toyota' },
  { id: '142', name: 'Senia', year: null, price: 'Rp 80,700,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=Kjh-eIjs8Zg', merk: 'Daihatsu' },
  { id: '143', name: 'Chevrolet Orlando', year: 2014, price: 'Price Not Specified', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=TC4aBfH0hZQ', merk: 'Chevrolet' },
  { id: '144', name: 'Innova V Diesel Matic', year: null, price: 'Rp 210,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=TC4aBfH0hZQ', merk: 'Toyota' },
  { id: '145', name: 'Toyota Innova Venturer', year: 2016, price: 'Rp 400,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=TC4aBfH0hZQ', merk: 'Toyota' },
  { id: '146', name: 'Innova G Diesel Manual', year: 2018, price: 'Rp 300,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=TC4aBfH0hZQ', merk: 'Toyota' },
  { id: '147', name: 'Isuzu Mux Premier Automatic', year: 2014, price: 'Rp 275,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=TC4aBfH0hZQ', merk: 'Isuzu' },
  { id: '148', name: 'Nissan Navara', year: 2019, price: 'Rp 385,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=TC4aBfH0hZQ', merk: 'Nissan' },
  { id: '149', name: 'Avanza Type G Manual', year: 2019, price: 'Rp 162,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=TC4aBfH0hZQ', merk: 'Toyota' },
  { id: '150', name: 'Avanza Type G Matic', year: 2017, price: 'Rp 148,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=TC4aBfH0hZQ', merk: 'Toyota' },
  { id: '151', name: 'Innova V Diesel Matic Barong', year: 2013, price: 'Rp 260,000,000', tax: 'Included', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=TC4aBfH0hZQ', merk: 'Toyota' },
  { id: '152', name: 'Agya X', year: 2014, price: 'Rp 87,000,000', tax: 'Included', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=TC4aBfH0hZQ', merk: 'Toyota' },
  { id: '153', name: 'Datsun Go', year: 2014, price: 'Rp 75,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=TC4aBfH0hZQ', merk: 'Datsun' },
  { id: '154', name: 'Suzuki Sidekick Dragon', year: 2001, price: 'Rp 48,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=TC4aBfH0hZQ', merk: 'Suzuki' },
  { id: '155', name: 'Kijang Diesel LGX', year: 2001, price: 'Rp 88,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=TC4aBfH0hZQ', merk: 'Toyota' },
  { id: '156', name: 'Daihatsu Grand Max 1.3 AC', year: 2017, price: 'Rp 85,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=TC4aBfH0hZQ', merk: 'Daihatsu' },
  { id: '157', name: 'Box Car', year: 2010, price: 'Rp 82,500,000', tax: 'Included', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=TC4aBfH0hZQ', merk: 'Unknown' },
  { id: '158', name: 'Avanza Type E Manual', year: 2014, price: 'Rp 115,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=TC4aBfH0hZQ', merk: 'Toyota' },
  { id: '159', name: 'Honda BRV', year: 2018, price: 'Rp 185,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=TC4aBfH0hZQ', merk: 'Honda' },
  { id: '160', name: 'Suzuki Splash Manual', year: 2012, price: 'Rp 88,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=TC4aBfH0hZQ', merk: 'Suzuki' },
  { id: '161', name: 'Honda Brio Type E Matic', year: 2021, price: 'Rp 168,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=TC4aBfH0hZQ', merk: 'Honda' },
  { id: '162', name: 'Honda Brio Type RS', year: 2019, price: 'Rp 170,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=TC4aBfH0hZQ', merk: 'Honda' },
  { id: '163', name: 'Toyota Yaris Type E Manual', year: 2012, price: 'Rp 105,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=TC4aBfH0hZQ', merk: 'Toyota' },
  { id: '164', name: 'Honda Brio Type S Matic', year: 2014, price: 'Rp 122,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=TC4aBfH0hZQ', merk: 'Honda' },
  { id: '165', name: 'Daihatsu Sirion Matic', year: 2019, price: 'Rp 155,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=TC4aBfH0hZQ', merk: 'Daihatsu' },
  { id: '166', name: 'Xenia Type X', year: 2016, price: 'Rp 135,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=TC4aBfH0hZQ', merk: 'Daihatsu' },
  { id: '167', name: 'Xenia Type X AC Double', year: 2012, price: 'Rp 103,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=TC4aBfH0hZQ', merk: 'Daihatsu' },
  { id: '168', name: 'Avanza Type G', year: 2005, price: 'Rp 87,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=TC4aBfH0hZQ', merk: 'Toyota' },
  { id: '169', name: 'Daihatsu Sigra', year: 2019, price: 'Price Not Specified', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=TC4aBfH0hZQ', merk: 'Daihatsu' },
  { id: '170', name: 'Agya Type X', year: 2016, price: 'Rp 98,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=TC4aBfH0hZQ', merk: 'Toyota' },
  { id: '171', name: 'Suzuki SX4', year: null, price: 'Rp 69,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=xvCXpngX_68', merk: 'Suzuki' },
  { id: '172', name: 'Honda CR-V', year: null, price: 'Rp 66,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=xvCXpngX_68', merk: 'Honda' },
  { id: '173', name: 'Suzuki Ertiga', year: 2017, price: 'Rp 110,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=xvCXpngX_68', merk: 'Suzuki' },
  { id: '174', name: 'Daihatsu Terios', year: 2013, price: 'Rp 116,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=xvCXpngX_68', merk: 'Daihatsu' },
  { id: '175', name: 'Honda Mobilio', year: 2014, price: 'Rp 113,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=xvCXpngX_68', merk: 'Honda' },
  { id: '176', name: 'Honda City', year: 2005, price: 'Rp 77,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=xvCXpngX_68', merk: 'Honda' },
  { id: '177', name: 'Toyota Vios Gen 3', year: 2016, price: 'Rp 88,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=xvCXpngX_68', merk: 'Toyota' },
  { id: '178', name: 'Nissan Juke RX', year: 2011, price: 'Rp 98,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=xvCXpngX_68', merk: 'Nissan' },
  { id: '179', name: 'Daihatsu Sigra', year: 2024, price: 'Rp 125,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=xvCXpngX_68', merk: 'Daihatsu' },
  { id: '180', name: 'Kia Picanto', year: 2011, price: 'Rp 68,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=xvCXpngX_68', merk: 'Kia' },
  { id: '181', name: 'Toyota Avanza', year: 2011, price: 'Rp 88,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=xvCXpngX_68', merk: 'Toyota' },
  { id: '182', name: 'Toyota Vios Gen 2', year: null, price: 'Rp 48,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=xvCXpngX_68', merk: 'Toyota' },
  { id: '183', name: 'Toyota Fortuner', year: null, price: 'Rp 325,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=xvCXpngX_68', merk: 'Toyota' },
  { id: '184', name: 'Toyota Innova Reborn', year: 2016, price: 'Rp 255,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=xvCXpngX_68', merk: 'Toyota' },
  { id: '185', name: 'Toyota Veloz', year: 2015, price: 'Rp 120,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=xvCXpngX_68', merk: 'Toyota' },
  { id: '186', name: 'Datsun', year: 2014, price: 'Rp 85,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=xvCXpngX_68', merk: 'Datsun' },
  { id: '187', name: 'Nissan Juke', year: null, price: 'Rp 105,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=xvCXpngX_68', merk: 'Nissan' },
  { id: '188', name: 'Mercedes-Benz', year: 2005, price: 'Rp 52,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=xvCXpngX_68', merk: 'Mercedes-Benz' },
  { id: '189', name: 'Suzuki Grand Vitara', year: 2006, price: 'Rp 88,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=xvCXpngX_68', merk: 'Suzuki' },
  { id: '190', name: 'Honda Jazz S', year: 2013, price: 'Rp 112,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=xvCXpngX_68', merk: 'Honda' },
  { id: '191', name: 'Toyota Yaris STRD Race', year: 2021, price: 'Rp 175,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=xvCXpngX_68', merk: 'Toyota' },
  { id: '192', name: 'Chevrolet Spark', year: null, price: 'Rp 49,000,000', tax: 'Not specified', source: { name: 'SHOWROOM MOBIL MURAH', location: 'Not specified', description: 'Extracted from YouTube video', phone_number: 'N/A' }, youtube_video_link: 'https://www.youtube.com/watch?v=xvCXpngX_68', merk: 'Chevrolet' },
];


// Main App component
function App() {
  // State for YouTube URL input
  const [youtubeUrl, setYoutubeUrl] = useState('');
  // State for displaying filtered car data
  const [filteredCarData, setFilteredCarData] = useState([]);
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false);
  // State for error messages
  const [error, setError] = useState(null);

  // Filter states for the sidebar
  const [filterYear, setFilterYear] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterMerk, setFilterMerk] = useState('');
  const [filterPriceFrom, setFilterPriceFrom] = useState('');
  const [filterPriceTo, setFilterPriceTo] = useState('');

  // Function to clean and convert price string to a number for comparison
  const parsePrice = (priceString) => {
    if (!priceString || priceString === 'Price Not Specified' || priceString === 'Price Negotiable') {
      return null;
    }
    // Remove "Rp", dots, commas, and "juta", "ribu" then convert to number
    let cleanedPrice = priceString.replace(/Rp\s*/i, '').replace(/\./g, '').replace(/,/g, '');
    if (cleanedPrice.toLowerCase().includes('juta')) {
      cleanedPrice = parseFloat(cleanedPrice.replace(/juta/i, '').trim()) * 1_000_000;
    } else if (cleanedPrice.toLowerCase().includes('ribu')) {
      cleanedPrice = parseFloat(cleanedPrice.replace(/ribu/i, '').trim()) * 1_000;
    } else {
      cleanedPrice = parseFloat(cleanedPrice);
    }
    return isNaN(cleanedPrice) ? null : cleanedPrice;
  };

  // Effect to apply filters whenever filter states change
  useEffect(() => {
    applyFilters();
  }, [filterYear, filterName, filterMerk, filterPriceFrom, filterPriceTo]); // Dependencies for useEffect

  // Function to apply filters to the ALL_CAR_LISTINGS data
  const applyFilters = () => {
    let tempFilteredData = [...ALL_CAR_LISTINGS]; // Start with all data

    // Filter by Year
    if (filterYear) {
      const yearNum = parseInt(filterYear);
      if (!isNaN(yearNum)) {
        tempFilteredData = tempFilteredData.filter(car => car.year === yearNum);
      }
    }

    // Filter by Name (case-insensitive partial match)
    if (filterName) {
      const lowerFilterName = filterName.toLowerCase();
      tempFilteredData = tempFilteredData.filter(car =>
        car.name.toLowerCase().includes(lowerFilterName)
      );
    }

    // Filter by Merk (case-insensitive partial match)
    if (filterMerk) {
      const lowerFilterMerk = filterMerk.toLowerCase();
      tempFilteredData = tempFilteredData.filter(car =>
        car.merk && car.merk.toLowerCase().includes(lowerFilterMerk)
      );
    }

    // Filter by Price Range
    const priceFromNum = parsePrice(filterPriceFrom);
    const priceToNum = parsePrice(filterPriceTo);

    if (priceFromNum !== null) {
      tempFilteredData = tempFilteredData.filter(car => {
        const carPrice = parsePrice(car.price);
        return carPrice !== null && carPrice >= priceFromNum;
      });
    }
    if (priceToNum !== null) {
      tempFilteredData = tempFilteredData.filter(car => {
        const carPrice = parsePrice(car.price);
        return carPrice !== null && carPrice <= priceToNum;
      });
    }

    setFilteredCarData(tempFilteredData);
  };

  // Initial load of all data when component mounts
  useEffect(() => {
    setFilteredCarData(ALL_CAR_LISTINGS);
  }, []);

  // Function to handle changes in the YouTube URL input field
  const handleUrlChange = (event) => {
    setYoutubeUrl(event.target.value);
  };

  // Function to handle the "Crawl Information" button click
  const handleCrawlClick = async () => {
    setError(null);
    setIsLoading(true);
    // In this version, we are not actually crawling, just simulating and showing local data.
    // For a real app, this would trigger the backend API call.
    console.log(`Simulating crawl for: ${youtubeUrl}`);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // After simulation, you would typically update ALL_CAR_LISTINGS with new data
    // and then re-apply filters. For this local data version, we just show existing.
    // In a real app, the backend would return new data, which you'd add to your state/database.
    // For now, we'll just re-filter the existing data to show the effect.
    applyFilters(); // Re-apply filters to show all data or current filters if any
    setIsLoading(false);
  };


  return (
    // Main container with responsive layout
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800 flex flex-col md:flex-row">
      {/* Sidebar for filters and preferences */}
      <aside className="w-full md:w-1/4 bg-white p-6 shadow-lg rounded-lg m-4 md:mr-0 flex-shrink-0">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 border-b-2 border-indigo-200 pb-2">
          Filter Cars
        </h2>
        <div className="space-y-4">
          {/* Year Filter */}
          <div>
            <label htmlFor="year-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Year:
            </label>
            <input
              type="number"
              id="year-filter"
              placeholder="e.g., 2015"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {/* Name/Model Filter */}
          <div>
            <label htmlFor="name-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Model Name:
            </label>
            <input
              type="text"
              id="name-filter"
              placeholder="e.g., Avanza"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {/* Make/Merk Filter */}
          <div>
            <label htmlFor="merk-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Make/Merk:
            </label>
            <input
              type="text"
              id="merk-filter"
              placeholder="e.g., Toyota"
              value={filterMerk}
              onChange={(e) => setFilterMerk(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Range (Rp):
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                id="price-from"
                placeholder="From"
                value={filterPriceFrom}
                onChange={(e) => setFilterPriceFrom(e.target.value)}
                className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="number"
                id="price-to"
                placeholder="To"
                value={filterPriceTo}
                onChange={(e) => setFilterPriceTo(e.target.value)}
                className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          {/* Apply Filters Button (triggers useEffect via state changes) */}
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
            onClick={applyFilters}
          >
            Apply Filters
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-4 md:p-6">
        <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
          <h1 className="text-3xl font-extrabold text-indigo-800 mb-4">
            YouTube Car Information Extractor
          </h1>
          <p className="text-gray-600 mb-6">
            Paste a YouTube video URL below to simulate crawling and view existing car listings.
            **Note: Direct SQLite access from a web browser is not possible due to security restrictions.
            For persistent and shared data, a backend (Google Cloud Function) with a database (like Firestore) is required.**
          </p>

          {/* URL Input and Button */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Paste YouTube video URL here (e.g., https://www.youtube.com/watch?v=FOAY5Q8DXpo)"
              className="flex-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
              value={youtubeUrl}
              onChange={handleUrlChange}
            />
            <button
              onClick={handleCrawlClick}
              disabled={isLoading}
              className={`px-6 py-3 rounded-md font-semibold text-white shadow-md transition duration-300 ease-in-out
                ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {isLoading ? 'Simulating Crawl...' : 'Simulate Crawl & View Data'}
            </button>
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-4" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700"></div>
              <p className="ml-4 text-lg text-indigo-700">Loading data...</p>
            </div>
          )}

          {/* Car Listings Grid View */}
          {!isLoading && filteredCarData.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-indigo-700 mb-4 border-b-2 border-indigo-200 pb-2">
                Available Car Listings ({filteredCarData.length} results)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCarData.map((car) => (
                  <div key={car.id} className="bg-white p-5 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{car.name} ({car.year || 'N/A'})</h3>
                    <p className="text-lg text-indigo-600 font-semibold mb-2">{car.price}</p>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Merk:</span> {car.merk || 'Unknown'}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Tax:</span> {car.tax || 'N/A'}
                    </p>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Source:</span> {car.source.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        <span className="font-medium">Video:</span> <a href={car.youtube_video_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline truncate">{car.youtube_video_link.split('v=')[1].substring(0,10)}...</a>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isLoading && filteredCarData.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No car information found matching your filters.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

// You would typically include this in your public/index.html or a similar entry file
// to load Tailwind CSS and set up the viewport meta tag.
/*
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YouTube Car Extractor</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body {
        font-family: 'Inter', sans-serif;
      }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/index.js"></script>
</body>
</html>
*/