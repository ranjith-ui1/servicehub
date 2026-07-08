import "./Hero.css";

function Hero({ title, subtitle, button }) {
  return (
    <section className="hero">
      <h1>{title}</h1>

      <p>{subtitle}</p>

      <button>{button}</button>
    </section>
  );
}

export default Hero;