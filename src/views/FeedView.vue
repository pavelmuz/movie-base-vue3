<template>
  <div id="cards-list">
    <!-- Movie card -->
    <div v-for="movie in feedData" :key="movie" class="container card movie-card mx-auto mb-2">
      <!-- Movie owner info -->
      <div class="row py-2">
        <div class="col-auto">
          <img src="@/assets/images/test_avatar.png" class="avatar-img-sm" />
        </div>
        <div class="col ps-0">
          <p class="card-text">{{ movie.owner.username }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <!-- Movie poster -->
          <img :src="movie.poster_url" class="rounded movie-card-poster" />
          <div class="row py-0">
            <!-- Like and unlike buttons -->
            <form action="" method="post" class="col-auto my-auto px-0">
              <button type="submit" class="btn card-button card-button" name="movie">
                <i class="fa-solid fa-heart fa-xl"></i>
              </button>
              <!-- <button type="submit" class="btn card-button" name="movie">
                <i class="fa-regular fa-heart fa-xl card-button"></i>
              </button> -->
            </form>
            <!-- New comment section -->
            <div class="col-auto my-auto ps-0">
              <!-- Add comment modal open button -->
              <p class="card-text modal-link mb-0" data-bs-toggle="modal" data-bs-target="#comment">
                <i class="fa-regular fa-message fa-xl card-button"></i>
              </p>
              <!-- Add comment modal -->
              <div class="modal fade" id="comment" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div class="modal-content">
                    <div class="modal-header">
                      <!-- Modal title -->
                      <h1 class="modal-title fs-5">Комментарий:</h1>
                      <button class="btn modal-close" data-bs-dismiss="modal">
                        <i class="fa-solid fa-xmark fa-xl"></i>
                      </button>
                    </div>
                    <div class="modal-body">
                      <!-- Add new comment form -->
                      <div class="row">
                        <form action="" method="post" class="pb-2">
                          <label class="form-label">Добавить комментарий:</label>
                          <textarea class="form-control" rows="3"></textarea>
                          <button type="submit" class="btn edit-btn" name="comment">
                            Добавить
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Movie info -->
        <div class="col-8">
          <a href="#" class="card-link text-decoration-none">
            <h5 class="card-title">{{ movie.title }}</h5>
            <p class="card-text"><strong>Рейтинг: </strong>{{ movie.user_rating }}</p>
            <p class="card-text"><strong>Обзор: </strong>{{ movie.description }}</p>
          </a>
        </div>
      </div>
      <!-- Total likes -->
      <div class="row">
        <!-- Likes modal open buuton -->
        <p class="card-text modal-link mb-0" data-bs-toggle="modal" data-bs-target="#modal">
          <strong>Нравится: </strong>2
        </p>
        <!-- Likes modal -->
        <div class="modal fade" id="modal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <!-- Modal title -->
                <h1 class="modal-title fs-5">Нравится:</h1>
                <button class="btn modal-close" data-bs-dismiss="modal">
                  <i class="fa-solid fa-xmark fa-xl"></i>
                </button>
              </div>
              <div class="modal-body">
                <!-- List of users liked -->
                <div class="row">
                  <!-- User avatar -->
                  <div class="col-auto my-auto pe-0">
                    <a href="#" class="card-link text-decoration-none">
                      <img src="@/assets/images/test_avatar.png" class="avatar-img-md" />
                    </a>
                  </div>
                  <!-- User info -->
                  <div class="col-6 my-auto">
                    <a href="#" class="card-link text-decoration-none">
                      <div class="card-body">
                        <h5 class="card-title">test_user</h5>
                        <p class="card-subtitle">Test User</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Last 2 comments -->
      <div class="row pb-2">
        <p class="card-text mb-0"><strong>test_user</strong> Some test comment</p>
      </div>
      <!-- Show all comments button -->
      <div class="row mb-2">
        <a href="#" class="card-link text-decoration-none">
          <p class="card-subtitle">Показать все комментарии (5)</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import apiMovibase from '@/includes/apiMoviebase'
export default {
  name: 'MainFeed',
  data() {
    return {
      feedData: {}
    }
  },
  async mounted() {
    try {
      this.feedData = await apiMovibase.getFeed()
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped>
.card-link,
.modal-close {
  color: #c3edc0;
}

.modal-close:hover {
  color: #9cbd99;
}

.movie-card,
.modal-content {
  background-color: #0b666a;
  color: #c3edc0;
  max-width: 700px;
}

.movie-card-poster {
  max-width: 220px;
}

.card-button {
  color: #c3edc0;
}

.edit-btn {
  background-color: #c3edc0;
}

.edit-btn:hover {
  background-color: #9cbd99;
}

.avatar-img-md {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-img-sm {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
