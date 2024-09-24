export default function ProgressSteps({ step1, step2, step3 }) {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className={`${step1 ? "text-succuss" : "text-secondary"}`}>
        <span>Login</span>
        <div className="text-center" style={{ height: "5px" }}>
          ✅
        </div>
      </div>
      {step2 && (
        <>
          {step1 && (
            <div
              className="bg-succuss"
              style={{ backgroundColor: "green", padding: "1px 45px" }}
            ></div>
          )}
          <div className={`${step1 ? "text-succuss" : "text-secondary"}`}>
            <span>Shipping</span>
            <div className="text-center" style={{ height: "5px" }}>
              ✅
            </div>
          </div>
        </>
      )}

      <>
        {step1 && step2 && step3 ? (
          <div
            className="bg-succuss"
            style={{ backgroundColor: "green", padding: "1px 45px" }}
          ></div>
        ) : (
          ""
        )}

        <div className={`${step3 ? "text-succuss" : "text-secondary"}`}>
          <span className={`${!step3 ? "mx-5" : ""}`}>Summary</span>
          {step1 && step2 && step3 ? (
            <div className="text-center" style={{ height: "5px" }}>
              ✅
            </div>
          ) : (
            ""
          )}
        </div>
      </>
    </div>
  );
}
