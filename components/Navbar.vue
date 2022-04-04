<template>
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div class="position-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <NuxtLink class="nav-link" :to="{name:'index'}" :class="{'active':$router.name==='index'}" :aria-current="{'page':$router.name==='index'}">
                <span data-feather="bar-chart-2"></span>
                Korrektorlar
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script>
export default {
    name:'Navbar',
}
</script>

