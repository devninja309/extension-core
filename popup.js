document.getElementById("french").addEventListener("click", french);
document.getElementById("spanish").addEventListener("click", spanish);
document.getElementById("english").addEventListener("click", english);
document.getElementById("admin").addEventListener("click", admin);
document.querySelector("#toggle").addEventListener("click", () => {
  localStorage.setItem("status", !JSON.parse(localStorage.status));
  if (JSON.parse(localStorage.status))
    chrome.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: async () => {
          localStorage.setItem("status", true);
        }
      });
    });
  else
    chrome.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: async () => {
          localStorage.setItem("status", false);
        }
      });
    });
});

// document.getElementById("toggle").addEventListener("click", changeToggle);
if (!localStorage.status) localStorage.setItem("status", true);
document.querySelector("#toggle").checked = localStorage.status === "true";
if (JSON.parse(localStorage.status))
  chrome.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: async () => {
        localStorage.setItem("status", true);
      }
    });
  });
else
  chrome.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: async () => {
        localStorage.setItem("status", false);
      }
    });
  });

function french() {
  chrome.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: async () => {
        if (localStorage.status !== "true") return;
        const result = await fetch("http://localhost:5000/extension");
        const els = await result.json();
        els.map((item) => {
          console.log(item);
          if (item.french !== null)
            document.querySelector(item.unique).textContent = item.french;
        });
        // document.querySelector(result.json().selector)
      }
    });
  });
}

function spanish() {
  chrome.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: async () => {
        if (localStorage.status !== "true") return;
        const result = await fetch("http://localhost:5000/extension");
        const els = await result.json();
        console.log(els);
        els.map((item) => {
          console.log(item[10]);
          if (item.spanish !== null)
            document.querySelector(item.unique).textContent = item.spanish;
        });
        // document.querySelector(result.json().selector)  "[" + item.unique + "]"
      }
    });
  });
}

function english() {
  chrome.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: async () => {
        if (localStorage.status !== "true") return;
        const result = await fetch("http://localhost:5000/extension");
        const els = await result.json();
        els.map((item) => {
          console.log(item);
          if (item.english !== null)
            document.querySelector(item.unique).textContent = item.english;
        });
        // document.querySelector(result.json().selector)
      }
    });
  });
}

function admin() {
  window.open("http://localhost:3000/project/translate");
}

//   req.query?.language
//   const result = await fetch("http://localhost:5000/extension?language=french")
// var isActive = true;
// function changeToggle(e) {
//   isActive = e.target.checked;
//   if (!isActive) {
//     document
//       .getElementById("button_group")
//       .setAttribute("style", "display:none !important");
//   } else {
//     document
//       .getElementById("button_group")
//       .setAttribute("style", "display:flex !important");
//   }
// }
