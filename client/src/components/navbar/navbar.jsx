/*
    Reference: The following code snippet is taken from Chat-GPT reference: https://chatgpt.com/share/69397baf-95bc-8000-867f-d2f075ee00ac
    This component is meant to be used as a re-usable component in login and landing pages only.
*/

function Navbar({ title }) {
  return (
    <div style={styles.navbar}>
      <span style={styles.text}>{title}</span>
    </div>
  );
}

const styles = {
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "10vh",       // 10% of viewport height
    width: "100%",
    backgroundColor: 'teal',
    color: "white",
    display: "flex",
    alignItems: "center", // Vertically center text
    justifyContent: "center",
    paddingLeft: "20px",
    zIndex: 1000
  },
  text: {
    fontSize: "18px",
    fontWeight: "600"
  }
};

export default Navbar;
