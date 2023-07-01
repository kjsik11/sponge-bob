import Generator from '@/components/custom/Generator';

import textShadowBuilder from '@/utils/text-shadow-builder';

export default function HomePage() {
  return (
    <main className="px-2">
      <h1
        className="flex justify-center mt-8 font-spongeBoy text-4xl text-center leading-[1.5] text-amber-300"
        style={{
          textShadow: textShadowBuilder('#fff360'),
        }}
      >
        Sponge Bob
        <br className="md:hidden" /> Time Card Generator
      </h1>
      <Generator />
    </main>
  );
}
