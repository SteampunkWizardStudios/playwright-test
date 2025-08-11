type MyImageProps = {
  items?: string[];
};

export default function MyImage({
  items = ["Default"],
}: MyImageProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "center",
      }}
    >
      {items.map((item) => (
        <div
          key={item}
          style={{
            fontSize: "24px",
            fontFamily: "Arial, sans-serif",
            color: "#f4f4f5",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
