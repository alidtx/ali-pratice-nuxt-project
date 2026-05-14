<script setup>
import CartIcon from '~/components/Icons/cartIcon.vue';


</script>

<template>
    <header class="sticky top-0 z-30 bg-white shadow-md backdrop-blur-sm bg-white/95">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-2">
                <div>
                    <h1 class="text-xl font-bold tracking-tight text-gray-800"><NuxtLink to="/">Ali's <span
                            class="text-indigo-600">Store</span></NuxtLink></h1>
                    <p class="text-xs text-gray-500 hidden sm:block">buying best</p>
                </div>
            </div>
            <div class="hidden md:flex items-center gap-6">
                <NuxtLink to="/about" class="text-gray-600 hover:text-indigo-600">
                    About
                </NuxtLink>

                <NuxtLink to="/contact" class="text-gray-600 hover:text-indigo-600">
                    Contact
                </NuxtLink>
            </div>
            <div class="flex items-center gap-4">
                <CartIcon/>
            </div>
        </div>
    </header>

    <main class="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <slot />
    </main>

    <footer class="bg-white border-t border-gray-200 mt-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div class="space-y-2">
                    <h3 class="font-bold text-gray-800 text-lg">Ali's Store</h3>
                    <div class="flex gap-3 pt-2">
                        <i class="fab fa-twitter text-gray-400 hover:text-indigo-500 cursor-pointer"></i>
                        <i class="fab fa-instagram text-gray-400 hover:text-indigo-500 cursor-pointer"></i>
                        <i class="fab fa-facebook-f text-gray-400 hover:text-indigo-500 cursor-pointer"></i>
                    </div>
                </div>
                <div>
                    <h4 class="font-semibold text-gray-700">Shop</h4>
                    <ul class="mt-2 space-y-1 text-sm text-gray-500">
                        <li><a href="#" class="hover:text-indigo-600">navigation</a></li>
                        <li><a href="#" class="hover:text-indigo-600">navigation</a></li>
                        <li><a href="#" class="hover:text-indigo-600">navigation</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold text-gray-700">Support</h4>
                    <ul class="mt-2 space-y-1 text-sm text-gray-500">
                        <li><a href="#" class="hover:text-indigo-600">navigation</a></li>
                        <li><a href="#" class="hover:text-indigo-600">navigation</a></li>
                        <li><a href="#" class="hover:text-indigo-600">navigation</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold text-gray-700">Newsletter</h4>
                    <p class="text-xs text-gray-500 mt-1">Test Development</p>
                    <div class="flex mt-2">
                        <input type="email" placeholder="Your email"
                            class="text-sm px-3 py-2 border border-gray-300 rounded-l-md w-full focus:ring-indigo-400 focus:border-indigo-400">
                        <button
                            class="bg-indigo-600 text-white px-3 rounded-r-md text-sm hover:bg-indigo-700">→</button>
                    </div>
                </div>
            </div>
            <div class="border-t border-gray-200 mt-8 pt-6 text-center text-xs text-gray-400">
                © 2026 test development
            </div>
        </div>
    </footer>
</template>