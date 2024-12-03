export function createModal(id, title, content) {
    return `
      <div id="${id}" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center hidden z-50">
        <div class="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2">
          <!-- Modal Header -->
          <div class="flex justify-between items-center border-b px-4 py-2">
            <h2 class="text-lg font-bold">${title}</h2>
            <button id="${id}-close" class="text-gray-500 hover:text-gray-700">&times;</button>
          </div>
          <!-- Modal Content -->
          <div class="p-4">
            ${content}
          </div>
          <!-- Modal Footer -->
          <div class="flex justify-end border-t px-4 py-2">
            <button id="${id}-action" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Place Bid
            </button>
          </div>
        </div>
      </div>
    `;
  }
  