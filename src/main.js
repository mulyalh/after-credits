const URL = "https://v1.appbackend.io/v1/rows/yEFxdbYCrjnj";

async function getData(URL) {
  try {
    const res = await fetch(URL);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error fetching data", error);
    return { data: [], status: "error" };
  }
}

async function createData(name, review) {
  try {
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ name, review }]),
    });

    window.location.reload();
  } catch (error) {
    console.log("failed to create data", error);
  }
}

async function main() {
  const reviews = await getData(URL);

  const reviewList = document.querySelector(".review-list");
  const submitBtn = document.querySelector("#submit");
  const fragment = document.createDocumentFragment();

  if (reviews.status === "error") {
    const errorDisplay = document.createElement("p");

    errorDisplay.textContent = "Failed to retrieve data, please try again";
    errorDisplay.classList.add("error-display");

    reviewList.append(errorDisplay);
    return;
  }

  if (reviews.data.length === 0) {
    const newInfo = document.createElement("p");

    newInfo.textContent = "Be the first to review this film!";
    newInfo.classList.add("data-not-found");

    reviewList.append(newInfo);
  }

  submitBtn.addEventListener("click", async () => {
    const name = document.querySelector("#name").value;
    const review = document.querySelector("#review").value;

    await createData(name, review);
  });

  reviews.data.forEach((review) => {
    const newContainer = document.createElement("div");
    const newName = document.createElement("h4");
    const newReview = document.createElement("p");

    newName.classList.add("reviewer-identity");
    newReview.classList.add("testimonial-body");

    newName.textContent = review.name;
    newReview.textContent = review.review;

    newContainer.append(newName, newReview);
    fragment.append(newContainer);
  });

  reviewList.append(fragment);
}

main();
