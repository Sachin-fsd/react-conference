function formatText(text) {
    return text.split("\n").map((line, index) => <p key={index}>{line}</p>);
}

function myFunction(id) {
    document.getElementById("myDropdown-" + id).classList.toggle("show");
  }

  function likePost(event, postID, authorID) {
    console.log(event, postID, authorID);

    if (event.target.className === "bx bx-like") {
      event.target.className = "bx bxs-like";
      // event.target.setAttribute("style", "color: #f54a6c");
    } else {
      event.target.className = "bx bx-like";
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}/like/${postID}/${authorID}`, {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  function deletePost(id) {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/delete/` + id, {
      method: "DELETE",
      credentials: 'include'
    })
      .then((response) => response.json())
      .then(() => window.location.reload())
      .catch((error) => {
        console.error("Error:", error);
      });
  }

export {formatText,likePost,deletePost,myFunction}