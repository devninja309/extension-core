Array.prototype.extend = function (other_array) {
  /* You should include a test to check whether other_array really is an array */
  other_array.forEach(function (v) {
    this.push(v);
  }, this);
};

const getCssSelectorShort = (el) => {
  let path = [],
    parent;
  while ((parent = el.parentNode)) {
    let tag = el.tagName,
      siblings;
    path.unshift(
      el.id
        ? `#${el.id}`
        : ((siblings = parent.children),
          [].filter.call(siblings, (sibling) => sibling.tagName === tag)
            .length === 1
            ? tag
            : `${tag}:nth-child(${1 + [].indexOf.call(siblings, el)})`)
    );
    el = parent;
  }
  return `${path.join(" > ")}`.toLowerCase();
};

// const getCssSelector = (el) => {
//   let path = [], parent;
//   while (parent = el.parentNode) {
//     path.unshift(`${el.tagName}:nth-child(${[].indexOf.call(parent.children, el)+1})`);
//     el = parent;
//   }
//   return `${path.join(' > ')}`.toLowerCase();
// };

const english = [];
if (localStorage.status === "true")
  fetch("http://localhost:5000/selector")
    .then((res) => res.json())
    .then((res) => {
      res.map((item) => {
        english.extend(
          [...document.querySelectorAll("[" + item.selector + "]")]
            .filter(
              (e) => e.childElementCount === 0 && e.innerHTML.length !== 0
            )
            .map((el) => ({
              [`${item.selector}="${el.getAttribute(item.selector)}"`]: [
                el.innerText,
                getCssSelectorShort(el)
              ]
            }))
        );
      });
      fetch("http://localhost:5000/extension", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ english })
      }).then();
    });

// var english = document.querySelector('[data-qa="title"]').textContent;

// document.querySelector('[data-qa="title"]').textContent =
//   "the way work should work";
