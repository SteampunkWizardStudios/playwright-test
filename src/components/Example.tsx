type ExampleProps = {
  avatarUrl: string;
  username: string;
  text: string;
};

export default function Example({ avatarUrl, username, text }: ExampleProps) {
  return (
    <div id="example"
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <img
          src={avatarUrl}
          alt="Avatar"
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #eee",
          }}
        />
        <h2
          style={{
            margin: 0,
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#e0e0e0",
          }}
        >
          {username}
        </h2>
      </div>
      <blockquote
        style={{
          margin: "0",
          padding: "1rem",
          background: "#3a404dff",
          color: "#d9d9d9ff",
          fontStyle: "italic",
          borderRadius: "1rem",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {text}
      </blockquote>
    </div>
  );
}
