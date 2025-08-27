const { useState } = React;

function isArmstrongNumber(n) {
  if (n < 0) return false;
  const s = String(n);
  const len = s.length;
  let sum = 0;
  for (let ch of s) sum += Math.pow(Number(ch), len);
  return sum === n;
}

function generateArmstrongUpTo(limit) {
  const res = [];
  for (let i = 0; i <= limit; i++) {
    if (isArmstrongNumber(i)) res.push(i);
  }
  return res;
}

function ArmstrongApp() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [found, setFound] = useState(null);
  const [list, setList] = useState([]);

  function handleCheck() {
    if (input === "") {
      setMessage("Please enter a non-negative integer.");
      setFound(null);
      setList([]);
      return;
    }
    const n = Number(input);
    if (!Number.isInteger(n) || n < 0) {
      setMessage("Please enter a valid non-negative integer.");
      setFound(null);
      setList([]);
      return;
    }
    const ok = isArmstrongNumber(n);
    setFound(ok);
    setList([]);
    setMessage(
      ok ? `${n} is an Armstrong number.` : `${n} is NOT an Armstrong number.`
    );
  }

  function handleGenerate() {
    if (input === "") {
      setMessage("Please enter a non-negative integer.");
      setFound(null);
      setList([]);
      return;
    }
    const n = Number(input);
    if (!Number.isInteger(n) || n < 0) {
      setMessage("Please enter a valid non-negative integer.");
      setFound(null);
      setList([]);
      return;
    }
    if (n > 1000000) {
      setMessage("Limit too big — please use ≤ 1,000,000.");
      setFound(null);
      setList([]);
      return;
    }
    setMessage(`Generating Armstrong numbers up to ${n}...`);
    // run generation (note: sequential; for very large n this may be slow)
    const arr = generateArmstrongUpTo(n);
    setList(arr);
    setFound(null);
    setMessage(`Found ${arr.length} Armstrong number(s) from 0 to ${n}.`);
  }

  function handleClear() {
    setInput("");
    setMessage("");
    setFound(null);
    setList([]);
  }

  return (
    <div className="app">
      <div className="header">
        <div className="title">
          <div className="logo">AN</div>
          <div>
            <h1>Armstrong Number Tool</h1>
            <div className="sub">
              Check a number or generate Armstrong numbers up to N
            </div>
          </div>
        </div>
        <div className="badges">
          <span className="badge">React</span> <span className="badge">JS</span>
        </div>
      </div>

      <div className="grid">
        <div className="panel">
          <div className="row">
            <input
              className="input"
              inputMode="numeric"
              placeholder="Enter non-negative integer.."
              value={input}
              onChange={(e) => setInput(e.target.value.replace(/[^\d]/g, ""))}
            />
            <button className="btn" onClick={handleCheck}>
              Check
            </button>
            <button className="btn secondary" onClick={handleGenerate}>
              Generate
            </button>
            <button className="btn ghost" onClick={handleClear}>
              Clear
            </button>
          </div>

          <div className="result" aria-live="polite">
            {message ? (
              <div style={{ color: "var(--muted)", marginBottom: 8 }}>
                {message}
              </div>
            ) : (
              <div style={{ color: "var(--muted)" }}>
                Results will appear here
              </div>
            )}

            {found !== null && (
              <div style={{ marginTop: 8 }}>
                <strong
                  style={{ color: found ? "var(--red-light)" : "var(--muted)" }}
                >
                  {found ? "Yes — Armstrong" : "No"}
                </strong>
              </div>
            )}

            {list.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <div style={{ marginBottom: 8, color: "var(--muted)" }}>
                  Armstrong numbers:
                </div>
                <div className="n-list">
                  {list.map((v) => (
                    <div key={v} className="n-item">
                      {v}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <aside className="info">
          <h3>About Armstrong Numbers</h3>
          <p>
            An <strong>Armstrong number</strong> (also called a narcissistic
            number) is a number that is the sum of its own digits each raised to
            the power of the number of digits.
            <br />
            <br />
            Example: <strong>153</strong> → 1³ + 5³ + 3³ = 1 + 125 + 27 = 153.
          </p>

          <h3>Examples</h3>
          <p className="sub">
            Small Armstrong numbers: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 153, 370,
            371, 407
          </p>

          <h3>Notes</h3>
          <p className="sub">
            Use Generate to list Armstrong numbers between 0 and your input.
            Large input cap: 1,000,000 (warning if bigger).
          </p>
        </aside>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ArmstrongApp />);
