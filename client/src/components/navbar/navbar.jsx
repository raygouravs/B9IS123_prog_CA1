/*
    Reference: The following code snippet is taken from Chat-GPT reference: https://chatgpt.com/share/69397baf-95bc-8000-867f-d2f075ee00ac
    This component is meant to be used as a re-usable component in login and landing pages only.
*/

function Navbar() {
  return (
    <div style={styles.navbar}>
      <span style={styles.text}>My Simple Navbar</span>
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
    backgroundColor: "#1e90ff",
    color: "white",
    display: "flex",
    alignItems: "center", // Vertically center text
    paddingLeft: "20px",
    zIndex: 1000
  },
  text: {
    fontSize: "18px",
    fontWeight: "500"
  }
};

export default Navbar;
