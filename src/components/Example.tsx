type ExampleProps = {
  avatarUrl: string;
  username: string;
};

export default function Example({ avatarUrl, username }: ExampleProps) {
  return (
    <div
      style={{
        maxWidth: 320,
        margin: "1rem auto",
        padding: "1.5rem",
        borderRadius: "2rem",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
		background: "#1f1f1f",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <img
        src={avatarUrl}
        alt="Avatar"
        style={{
          width: 96,
          height: 96,
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "1rem",
          border: "3px solid #eee",
        }}
      />
      <h2
        style={{
          margin: 0,
          fontSize: "2rem",
          fontWeight: 600,
          color: "#e0e0e0",
        }}
      >
        {username}
      </h2>
    </div>
  );
}
