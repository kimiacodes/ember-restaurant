const favorites = [
  {
    name: "The Ember Burger",
    description: "pure beef, melted cheese, and our signature sauce.",
    price: "$30",
    image: "/images/menu/ember-burger.webp",
    tag: "Signature",
  },
  {
    name: "Crispy Chicken",
    description: "Golden-crispy chicken with our signiyure sauce.",
    price: "$24",
    image: "/images/menu/crispy-chicken.webp",
    tag: "Crispy favorite",
  },
  {
    name: "Crispy Mashed Potato Fries",
    description: "Crispy fries and special sauce.",
    price: "$18",
    image: "/images/menu/crispy-mashed-potato-fries.webp",
    tag: "A side worth sharing",
  },
];

export default function FeaturedMenu() {
  return (
    <section
      id="menu"
      className="bg-[#100B08] px-5 py-20 text-[#F8F1E8] sm:px-8 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#FF6A0D]">
              Made to be remembered
            </p>

            <h2 className="max-w-2xl text-4xl font-extrabold italic leading-[0.95] tracking-tight sm:text-5xl md:text-7xl">
              Ember <span className="text-[#FF6A0D]">Favorites.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-white/60 sm:text-base">
            Big flavor, fresh ingredients, and the kind of food you’ll come
            back for.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((item) => (
            <article
              key={item.name}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#19110C] transition-colors duration-300 hover:border-[#FF6A0D]/50"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#24170F]">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm">
                  {item.tag}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 p-5 sm:p-6">
                <div>
                  <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
                    {item.name}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-white/55">
                    {item.description}
                  </p>
                </div>

                <span className="shrink-0 pt-1 text-lg font-bold text-[#FF6A0D]">
                  {item.price}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-9 flex justify-center md:mt-12">
          <a
            href="/menu"
            className="btn-17 inline-flex items-center justify-center px-5 py-2.5 text-sm"
          >
            <span className="text-container">
              <span className="text">Explore Full Menu</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}