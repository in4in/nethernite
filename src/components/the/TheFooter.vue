<template>
  <footer class="py-5 mt-auto">
    <div class="container">
      <div class="d-flex">
        <div class="flex-shrink-0">
          <div class="avatar rounded" />
        </div>
        <div class="flex-grow-1 ms-3">
          Hello, my name is Fedor. I am a developer with over 15 years of experience. I still love my hobby and continue to develop and gain new knowledge.
        </div>
      </div>
      <div class="d-flex justify-content-between pt-4 mt-4 border-top">
        <p>© 2022 From Fedor with love</p>
        <div class="social">
          <a
            class="ms-3 link-dark"
            target="_blank"
            href="https://t.me/fedor_inchin"
          >
            <i
              class="bi-telegram"
              role="img"
              aria-label="Telegram"
            />
          </a>
          <a
            class="ms-3 link-dark"
            target="_blank"
            href="https://github.com/in4in/nethernite"
          >
            <i
              class="bi-github"
              role="img"
              aria-label="GitHub"
            />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.avatar {
  width: 140px;
  height: 180px;
  background-image: url(https://hhcdn.ru/photo/639643658.jpeg?t=1651331172&h=wn4ihDIVVPg4PNSiqJnkLg);
  background-repeat: no-repeat;
  background-position: -35px -105px;
}
.social {
  display: flex;

  a { 
    font-size: 2em;
  }
}
</style>
