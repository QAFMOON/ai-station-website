import Image from "next/image";

// Photographs of the hardware and the places it runs. They are illustrations,
// so the page words always say what they show and the images carry empty alt text.
export const photos = {
  hero: "/images/hero-server-room.jpg",
  how: ["/images/how-storage.jpg", "/images/how-compute.jpg", "/images/how-access.jpg"],
  suite: [
    "/images/suite-code.jpg",
    "/images/suite-voice.jpg",
    "/images/suite-documents.jpg",
    "/images/suite-knowledge.jpg",
    "/images/suite-custom.jpg",
  ],
  stages: ["/images/stage-machine.jpg", "/images/stage-rack.jpg", "/images/stage-cluster.jpg"],
  premises: "/images/stage-rack.jpg",
  datacentre: "/images/where-datacentre.jpg",
  footer: "/images/gulf-footer.jpg",
} as const;

/** Several photos stacked in one frame. The chosen one fades in over the rest. */
export function PhotoStack({
  srcs,
  index,
  sizes,
  priority = false,
}: {
  srcs: readonly string[];
  index: number;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className="photo" aria-hidden="true">
      {srcs.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          sizes={sizes}
          priority={priority && i === 0}
          className={i === index ? "photo-img is-on" : "photo-img"}
        />
      ))}
    </div>
  );
}
