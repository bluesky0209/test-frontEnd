<template>
  <aside class="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50">
    <div class="flex flex-col h-full">
      <div class="p-4 border-b">
        <h1 class="text-xl font-bold text-gray-800">Dashboard</h1>
      </div>

      <nav class="flex-1 p-4">
        <ul class="space-y-2">
          <li>
            <a
              href="#"
              class="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg"
            >
              <span class="mr-3">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </span>
              Overview
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <span class="mr-3">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </span>
              Analytics
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <span class="mr-3">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </span>
              Users
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <span class="mr-3">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
              Settings
            </a>
          </li>
        </ul>
      </nav>

      <!-- User Profile -->
      <div class="p-4 border-t">
        <div class="flex items-center">
          <img
            src="https://ui-avatars.com/api/?name=John+Doe"
            alt="User"
            class="w-8 h-8 rounded-full"
          >
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-700">John Doe</p>
            <p class="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
