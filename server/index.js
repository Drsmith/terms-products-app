const fastify = require('fastify')({ logger: true });
const fastifyCors = require('@fastify/cors');
const dotenv = require('dotenv');
dotenv.config();

const productsRoutes = require('./routes/products');
const termsRoutes = require('./routes/terms');
const db = require('./config/db');
const Product = require('./models/Product');
const Terms = require('./models/Terms');

async function startServer() {
  try {
    await fastify.register(fastifyCors, {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    });

    fastify.register(productsRoutes);
    fastify.register(termsRoutes);

    // Sync database tables
    if (process.env.NODE_ENV !== 'production') {
      // Only drop and seed in development
      await Product.drop();
      await Terms.drop();
      fastify.log.info('Dropped old Product and Terms tables.');

      await db.sync({ alter: true });

      // Seed Products
      await Product.bulkCreate([
        { articleNo: "A101", productName: "Sample Product 1", inPrice: 50, price: 100, unit: "pcs", inStock: 10, description: "Seed product 1" },
        { articleNo: "A102", productName: "Sample Product 2", inPrice: 60, price: 120, unit: "pcs", inStock: 5, description: "Seed product 2" },
        { articleNo: "A103", productName: "Wireless Mouse", inPrice: 200, price: 299, unit: "pcs", inStock: 50, description: "Ergonomic design" },
        { articleNo: "A104", productName: "Mechanical Keyboard", inPrice: 700, price: 999, unit: "pcs", inStock: 30, description: "RGB lighting" },
        { articleNo: "A105", productName: "Laptop Stand", inPrice: 150, price: 300, unit: "pcs", inStock: 40, description: "Adjustable angle" },
        { articleNo: "A106", productName: "Webcam 1080p", inPrice: 250, price: 400, unit: "pcs", inStock: 20, description: "With mic" },
        { articleNo: "A107", productName: "USB-C Hub", inPrice: 100, price: 199, unit: "pcs", inStock: 60, description: "4-in-1 ports" },
        { articleNo: "A108", productName: "Wireless Charger", inPrice: 180, price: 250, unit: "pcs", inStock: 45, description: "Fast charge" },
        { articleNo: "A109", productName: "Bluetooth Speaker", inPrice: 300, price: 450, unit: "pcs", inStock: 25, description: "Waterproof" },
        { articleNo: "A110", productName: "Smart Plug", inPrice: 120, price: 199, unit: "pcs", inStock: 70, description: "WiFi control" },
        { articleNo: "A111", productName: "LED Desk Lamp", inPrice: 220, price: 350, unit: "pcs", inStock: 35, description: "Touch dimming" },
        { articleNo: "A112", productName: "Noise Cancelling Headphones", inPrice: 800, price: 1200, unit: "pcs", inStock: 15, description: "Over-ear design" },
        { articleNo: "A113", productName: "Smart Watch", inPrice: 900, price: 1500, unit: "pcs", inStock: 12, description: "Heart-rate monitor" },
        { articleNo: "A114", productName: "Fitness Band", inPrice: 400, price: 600, unit: "pcs", inStock: 18, description: "Step tracker" },
        { articleNo: "A115", productName: "Mini Projector", inPrice: 1300, price: 1800, unit: "pcs", inStock: 8, description: "Portable 720p" },
        { articleNo: "A116", productName: "Laptop Cooling Pad", inPrice: 200, price: 350, unit: "pcs", inStock: 30, description: "Dual fan system" },
        { articleNo: "A117", productName: "External Hard Drive 1TB", inPrice: 2200, price: 2999, unit: "pcs", inStock: 14, description: "USB 3.0" },
        { articleNo: "A118", productName: "HDMI Cable 5m", inPrice: 90, price: 150, unit: "pcs", inStock: 80, description: "High-speed" },
        { articleNo: "A119", productName: "Ethernet Cable Cat6", inPrice: 70, price: 120, unit: "pcs", inStock: 100, description: "10Gbps support" }
      ]);

      // Seed Terms
      await Terms.bulkCreate([
        {
          language: 'en',
          content: '<p>GENOM ATT klicka på Fakturera Nu så väljer ni att registrera enligt den information som ni har lagt in och texten på registrerings sidan och villkoren här, och accepterar samtidigt villkoren här.

Ni kan använda programmet GRATIS i 14 dagar.

123 Fakturera är så lätt och självförklarande att chansen för att du kommer behöva support är minimal, men om du skulle behöva support, så är vi här för dig, med vårt kontor bemannat större delen av dygnet. Efter provperioden så fortsätter abonnemanget och kostar 99 kronor exkl. moms per månad, som faktureras årligen. Om du inte vill behålla programmet, så är det bara att avbryta provperioden genom att ge oss besked inom 14 dagar från registrering.

Ni har självklart rätt att avsluta användningen av programmet utan kostnad, genom att ge oss besked per email inom 14 dagar från registrering, att ni inte vill fortsätta med programmet, och betalar då självklart inte heller något.

Om vi inte inom 14 dagar från registrering mottar sådant besked från er, så kan ordern av naturliga orsaker inte ändras. Med registrering menas det datum och klockslag då ni valde att trycka på knappen Fakturera Nu.

Fakturering sker för ett år i taget.

Priset för 123 Fakturera (specialpris kr 99:- / ord. pris kr 159:- per månad) är för årsavgift Start för ett års användning av programmet.

(Vid användning av specialpriset kr 99:- så räknas ett års perioden från registrering.)

Alla priser är exkl. moms.

Offert, Lagerstyrning, Medlemsfakturering, Fleranvändarversion och Engelsk utskrift är (eller kan vara) tilläggsmoduler som kan beställas senare.

Förmedling, samt fakturering kan komma att ske från K-Soft Sverige AB, Box 2826, 187 28 Täby. Vi kan i framtiden välja att samarbeta med annat företag för t.ex. förmedling och fakturering. Kundförhållandet är dock självklart med oss. Betalningen görs till det företag som fakturan kommer från.

Årsavgiften är löpande men om ni inte vill fortsätta att använda programmet, så är det bara att ge besked trettio dagar innan ingången av nästföljande ett års period.

Introduktionspriset (kr 99:- per månad) är för årsavgift Start för det första året. Efter det första året faktureras ord. pris vilket för närvarande är, för årsavgift Start, ett hundra och femtinio kronor per månad, för årsavgift Fjärrstyrning, tre hundra kronor per månad och för årsavgift Pro, tre hundra och trettiotre kronor per månad. Efter ett år faktureras årsavgift Fjärrstyrning som standard men ni kan välja Start eller Pro genom att ge besked när som helst innan förfallodagen.

Om ni väljer att behålla programmet genom att inte ge oss besked per email innan 14 dagar från registrering, om att ni inte vill fortsätta med programmet, så accepterar ni att ni kommer att betala fakturan för er beställning. Att inte betala fakturan eller sen betalning ger inte rätt till att annullera beställningen. Vi hjälper gärna att fiksa logo för er till självkostpris.

Licens för användning av 123 Fakturera säljs självklart enligt gällande lagar.

För att lättare kunna hjälpa er och ge er support samt för att följa lagarna, måste vi av naturliga orsaker spara er information.

I samband med lagring av information så kräver lagen att vi ger er följande information:

Om ni beställer som privatperson så har ni den ångerrätt som lagen fastställer. Er information sparas så att vi kan hjälpa er m.m. Vi kommer använda den för att kunna hjälpa er om ni behöver hjälp, följa lagarna ang. bokföring m.m. När det kommer uppgraderingar och liknande, kan vi komma att skicka er erbjudande och liknande om våra produkter och tjänster per email eller liknande. Ni kan också komma att bli kontaktad per email, post och telefon. Om ni inte vill bli kontaktad, bara skicka oss en email ang. det.

Ni kan när som helst begära att inte få tillsänt information om uppgraderingar per email, brev eller liknande och vi kommer då självklart inte att göra det. Sådan begäran skickar ni till oss per email, brev eller liknande.

Av naturliga orsaker måste vi spara, databehandla och flytta era data. Er information sparas tills vidare. Ni ger oss medgivande till att lagra, databehandla och flytta era data, samt att skicka er erbjudanden och liknande per email, brev och liknande, samt att informera andra om att ni är kund. Pga. sättet det fungerar på med programvara behöver medgivandet också ges till andra parter. Medgivandet ges därför till oss, samt till de företag och/eller person/personer som äger programvaran, källkod, hemsidan och liknande. Det ges också till nuvarande och framtida företag ägda och/eller kontrollerade av en eller flera av de som i dag äger och/eller kontrollerar oss. Det ges också till nuvarande och framtida personer (om några) som äger eller kommer till att äga programvaran, källkod, hemsidan och liknande. Detta både för nuvarande och framtida produkter och tjänster. Det ges också till ett annat företag, (som K-Soft Sverige AB), som vi kan använda för att skicka/sälja produkter, uppgraderingar och liknande, antingen genom att under förmedla programvaran eller på annat sätt.

Ni har självklart rätt att begära tillgång till, rättelse eller radering av informationen vi har om er. Ni har också rätt att begära begränsning av behandlingen av era uppgifter, eller att invända mot behandling samt rätten till dataportabilitet. Ni har självklart rätt att klaga till tillsynsmyndighet. Mer juridisk info om oss hittar ni här. Det är lagarna i Irland som är gällande lagar. Det är självklart helt frivilligt att lägga er order. Vi använder självklart inte någon automatiserad profilering och inte heller något automatiserat beslutsfattande.

Om ni vill kontakta oss, vänligen använd då informationen på denna hemsidan.

Klicka på Fakturera Nu för att registrera i enlighet med den information som ni har lagt in och villkoren här. (Datum och tidpunkt för inläggningen läggs in automatiskt i våra register.)

Vår erfarenhet är att våra kunder är mycket nöjda med sättet vi arbetar på och vi hoppas och tror att det också kommer att bli er upplevelse.

Ha en trevlig dag!</p>'
        },
        {
          language: 'sv',
          content: '<p>GENOM ATT klicka på Fakturera Nu så väljer ni att registrera enligt den information som ni har lagt in och texten på registrerings sidan och villkoren här, och accepterar samtidigt villkoren här.

Ni kan använda programmet GRATIS i 14 dagar.

123 Fakturera är så lätt och självförklarande att chansen för att du kommer behöva support är minimal, men om du skulle behöva support, så är vi här för dig, med vårt kontor bemannat större delen av dygnet. Efter provperioden så fortsätter abonnemanget och kostar 99 kronor exkl. moms per månad, som faktureras årligen. Om du inte vill behålla programmet, så är det bara att avbryta provperioden genom att ge oss besked inom 14 dagar från registrering.

Ni har självklart rätt att avsluta användningen av programmet utan kostnad, genom att ge oss besked per email inom 14 dagar från registrering, att ni inte vill fortsätta med programmet, och betalar då självklart inte heller något.

Om vi inte inom 14 dagar från registrering mottar sådant besked från er, så kan ordern av naturliga orsaker inte ändras. Med registrering menas det datum och klockslag då ni valde att trycka på knappen Fakturera Nu.

Fakturering sker för ett år i taget.

Priset för 123 Fakturera (specialpris kr 99:- / ord. pris kr 159:- per månad) är för årsavgift Start för ett års användning av programmet.

(Vid användning av specialpriset kr 99:- så räknas ett års perioden från registrering.)

Alla priser är exkl. moms.

Offert, Lagerstyrning, Medlemsfakturering, Fleranvändarversion och Engelsk utskrift är (eller kan vara) tilläggsmoduler som kan beställas senare.

Förmedling, samt fakturering kan komma att ske från K-Soft Sverige AB, Box 2826, 187 28 Täby. Vi kan i framtiden välja att samarbeta med annat företag för t.ex. förmedling och fakturering. Kundförhållandet är dock självklart med oss. Betalningen görs till det företag som fakturan kommer från.

Årsavgiften är löpande men om ni inte vill fortsätta att använda programmet, så är det bara att ge besked trettio dagar innan ingången av nästföljande ett års period.

Introduktionspriset (kr 99:- per månad) är för årsavgift Start för det första året. Efter det första året faktureras ord. pris vilket för närvarande är, för årsavgift Start, ett hundra och femtinio kronor per månad, för årsavgift Fjärrstyrning, tre hundra kronor per månad och för årsavgift Pro, tre hundra och trettiotre kronor per månad. Efter ett år faktureras årsavgift Fjärrstyrning som standard men ni kan välja Start eller Pro genom att ge besked när som helst innan förfallodagen.

Om ni väljer att behålla programmet genom att inte ge oss besked per email innan 14 dagar från registrering, om att ni inte vill fortsätta med programmet, så accepterar ni att ni kommer att betala fakturan för er beställning. Att inte betala fakturan eller sen betalning ger inte rätt till att annullera beställningen. Vi hjälper gärna att fiksa logo för er till självkostpris.

Licens för användning av 123 Fakturera säljs självklart enligt gällande lagar.

För att lättare kunna hjälpa er och ge er support samt för att följa lagarna, måste vi av naturliga orsaker spara er information.

I samband med lagring av information så kräver lagen att vi ger er följande information:

Om ni beställer som privatperson så har ni den ångerrätt som lagen fastställer. Er information sparas så att vi kan hjälpa er m.m. Vi kommer använda den för att kunna hjälpa er om ni behöver hjälp, följa lagarna ang. bokföring m.m. När det kommer uppgraderingar och liknande, kan vi komma att skicka er erbjudande och liknande om våra produkter och tjänster per email eller liknande. Ni kan också komma att bli kontaktad per email, post och telefon. Om ni inte vill bli kontaktad, bara skicka oss en email ang. det.

Ni kan när som helst begära att inte få tillsänt information om uppgraderingar per email, brev eller liknande och vi kommer då självklart inte att göra det. Sådan begäran skickar ni till oss per email, brev eller liknande.

Av naturliga orsaker måste vi spara, databehandla och flytta era data. Er information sparas tills vidare. Ni ger oss medgivande till att lagra, databehandla och flytta era data, samt att skicka er erbjudanden och liknande per email, brev och liknande, samt att informera andra om att ni är kund. Pga. sättet det fungerar på med programvara behöver medgivandet också ges till andra parter. Medgivandet ges därför till oss, samt till de företag och/eller person/personer som äger programvaran, källkod, hemsidan och liknande. Det ges också till nuvarande och framtida företag ägda och/eller kontrollerade av en eller flera av de som i dag äger och/eller kontrollerar oss. Det ges också till nuvarande och framtida personer (om några) som äger eller kommer till att äga programvaran, källkod, hemsidan och liknande. Detta både för nuvarande och framtida produkter och tjänster. Det ges också till ett annat företag, (som K-Soft Sverige AB), som vi kan använda för att skicka/sälja produkter, uppgraderingar och liknande, antingen genom att under förmedla programvaran eller på annat sätt.

Ni har självklart rätt att begära tillgång till, rättelse eller radering av informationen vi har om er. Ni har också rätt att begära begränsning av behandlingen av era uppgifter, eller att invända mot behandling samt rätten till dataportabilitet. Ni har självklart rätt att klaga till tillsynsmyndighet. Mer juridisk info om oss hittar ni här. Det är lagarna i Irland som är gällande lagar. Det är självklart helt frivilligt att lägga er order. Vi använder självklart inte någon automatiserad profilering och inte heller något automatiserat beslutsfattande.

Om ni vill kontakta oss, vänligen använd då informationen på denna hemsidan.

Klicka på Fakturera Nu för att registrera i enlighet med den information som ni har lagt in och villkoren här. (Datum och tidpunkt för inläggningen läggs in automatiskt i våra register.)

Vår erfarenhet är att våra kunder är mycket nöjda med sättet vi arbetar på och vi hoppas och tror att det också kommer att bli er upplevelse.

Ha en trevlig dag!</p>'
        }
      ]);

      fastify.log.info('Seeded products and terms (development only).');
    } else {
      // Production: sync only
      await db.sync();
      fastify.log.info('DB synced (production mode, no seeding).');
    }

    const port = process.env.PORT || 5000;
    await fastify.listen({ port, host: '0.0.0.0' });

    fastify.log.info(`Server running at http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

startServer();
