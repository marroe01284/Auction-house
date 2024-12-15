export function createModal(id, title, content) {
  return `
    <div id="${id}" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white shadow-lg w-11/12 md:w-1/2 relative">
        <div class="flex justify-between items-center border-b px-4 py-2">
          <h2 class="text-lg font-bold">${title}</h2>
          <button id="${id}-close" class="text-gray-500 hover:text-gray-700 text-xl font-bold absolute top-2 right-4">
            &times;
          </button>
        </div>
        <div class="p-4">
          ${content}
        </div>
        <div class="flex justify-end border-t px-4 py-2">
          // <button id="${id}-action" class="learn-more green">
          //   <span class="circle" aria-hidden="true">
          //     <span class="icon arrow"></span>
          //   </span>
          //   <span class="button-text">Place Bid</span>
          // </button>
        </div>
      </div>
    </div>
  `;
}


