const CAPABILITIES = [
  { n: "01", t: "ESP32", s: "S3, C3 y familia SoC" },
  { n: "02", t: "AVR / tinyAVR", s: "ATtiny y ATmega" },
  { n: "03", t: "STM32 / ARM", s: "Cortex-M" },
  { n: "04", t: "Nordic nRF", s: "BLE / SoC de bajo consumo" },
  { n: "05", t: "CAN Bus", s: "J1939 / TWAI" },
  { n: "06", t: "LoRa / LoRaWAN", s: "RAK3172, Sub-GHz" },
  { n: "07", t: "RS-485 / Modbus", s: "Bus industrial" },
  { n: "08", t: "RS-232", s: "Comunicación serial" },
  { n: "09", t: "Red celular", s: "SIMCom, Quectel (4G LTE)" },
  { n: "10", t: "GNSS / GPS", s: "u-blox, Quectel" },
  { n: "11", t: "BLE / Wi-Fi", s: "Conectividad inalámbrica" },
  { n: "12", t: "I2C / SPI / UART", s: "Buses embebidos" },
];

export function Capabilities() {
  return (
    <section className="sec" id="capacidades">
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow mono">Capacidades</p>
          <h2>Especialidades técnicas</h2>
          <p>Experiencia comprobada en electrónica embebida, RF y sistemas de telemetría.</p>
        </div>
        <div className="caps rv">
          {CAPABILITIES.map((item) => (
            <div className="cap" key={item.n}>
              <span className="n mono">{item.n}</span>
              <span className="t">{item.t}</span>
              <span className="s">{item.s}</span>
            </div>
          ))}
        </div>
        <a className="cap cap-more rv" href="#contacto">
          <span className="n mono">→</span>
          <span className="t">¿Necesitas otra tecnología?</span>
          <span className="s">Cuéntanos y te decimos con claridad si podemos hacerlo</span>
        </a>
      </div>
    </section>
  );
}
