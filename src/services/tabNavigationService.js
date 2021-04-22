import gridService from "./gridService";
/**
 * Tab navigation related abstractions.
 * @class Tab
 * */
class Tab {
  constructor() {
    this.Store = [];
    this.currentActiveIndex = -1;
    this.init();
  }

  setActiveElement() {
    this.currentActiveIndex = this.Store.findIndex(
      el => el == document.activeElement
    );
  }

  init = () => {
    if (typeof document == "undefined") return;
    const focussableElements =
      'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
    let focussable = Array.prototype.filter.call(
      document.querySelectorAll(focussableElements),
      element => {
        //check for visibility while always include the current activeElement
        return element.offsetWidth > 0 || element.offsetHeight > 0;
      }
    );
    this.Store = focussable;
  };

  nextElement = () => {
    if (gridService.isGridOn) {
      this.currentActiveIndex++;
      const id = gridService.grids[this.currentActiveIndex % 16];
      const el = document.getElementById(id);
      this.applyCSS(el, "add");
      el.focus();
      gridService.focusedEl = this.currentActiveIndex % 16;
      const prevIndex = gridService.grids[this.currentActiveIndex - 1];
      if (prevIndex != 0) {
        const prevEl = document.getElementById(prevIndex);
        this.applyCSS(prevEl, "remove");
      }

    } else {
      this.setActiveElement();
      if (this.Store.length !== 0) {
        this.currentActiveIndex++;
        const index = this.currentActiveIndex % this.Store.length;
        this.applyCSS(this.Store[index], "add");
        this.Store[index].focus();
        if (index !== 0) this.applyCSS(this.Store[index - 1], "remove");
      }
    }
  };

  previousElement = () => {
    if (gridService.isGridOn) {
      this.currentActiveIndex--;
      const id = gridService.grids[this.currentActiveIndex % 16];
      const el = document.getElementById(id);
      this.applyCSS(el, "add");
      el.focus();
      gridService.focusedEl = this.currentActiveIndex % 16;
      const prevIndex = gridService.grids[this.currentActiveIndex + 1];
      const prevEl = document.getElementById(prevIndex);
      this.applyCSS(prevEl, "remove");
    } else {
      if (this.currentActiveIndex > -1 && this.Store.length > 0) {
        this.currentActiveIndex--;
        const index = this.currentActiveIndex;
        this.applyCSS(this.Store[index], "add");
        this.applyCSS(this.Store[index + 1], "remove");
        this.Store[index].focus();
      }
    }
  };

  navigate = direction => {
    if (direction === "Left") {
      this.previousElement();
    } else if (direction === "Right") {
      this.nextElement();
    } else if (direction === "Long up") {
      this.Store[this.currentActiveIndex].click();
    }
  };

  applyCSS = (selector, action) => {
    if (action === "add") {
      selector.style.border = "5px solid #111";
      selector.style.boxShadow = "35px 35px 7px #99999";
      selector.style.borderBottomRightRadius = "15px";
    } else {
      selector.style.border = "";
      selector.style.boxShadow = "";
      selector.style.borderBottomRightRadius = "";
    }
  };
}
const tabNavigation = new Tab();
export default tabNavigation;
