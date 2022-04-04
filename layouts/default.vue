<template>
  <main class="app">
    <Header/>
    <div class="container-fluid">
      <div class="row">
        <Navbar/>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div class="pt-3 pb-2 mb-3 border-bottom">
            <Nuxt keep-alive />
          </div>
        </main>
      </div>
    </div>
  </main>
</template>
