/* eslint-disable no-nested-ternary */
import React, { useState, useCallback, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';
import 'react-day-picker/lib/style.css';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useToast } from '../../hooks/toast';
import {
  Container,
  Content,
  Header,
  HeaderContent,
  Profile,
  MovieInfo,
  ReviewActions,
} from './styles';
import imgProfile from '../../assets/logo.png';
import api from '../../services/api';

interface MovieParams {
  movieID: string;
}

interface Review {
  _id: string;
  user: string;
  movie_id: string;
  like: boolean;
  dislike: boolean;
}

interface InfoMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Director: string;
  Actors: string;
  Plot: string;
  Language: string;
  Awards: string;
  Poster: string;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
}

const MovieReview: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState<InfoMovie | null>(null);
  const [movieReview, setMovieReview] = useState<Review | null>(null);
  const { params } = useRouteMatch<MovieParams>();
  const history = useHistory();

  const { addToast } = useToast();


  return (
    <Container>
      <Header>
        <HeaderContent>
          <Profile>
            <img src={imgProfile} alt="Profile" />

            <div>
              <strong>Movie Review</strong>
            </div>
          </Profile>

          <button type="button" onClick={() => {}}>
            <FiArrowLeft />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        {(loading || !movie || !movieReview) && <p>Loading...</p>}

        {!loading && movie && movieReview && (
          <MovieInfo
            like={movieReview && movieReview.like}
            dislike={movieReview && movieReview.dislike}
          >
            <header>
              <img src={movie.Poster} alt={movie.Title} />
              <div>
                <h1>{movie.Title}</h1>
                <h4>
                  (
                  {!movieReview
                    ? 'No reviewed'
                    : movieReview.like
                    ? 'Like'
                    : movieReview.dislike
                    ? 'Dislike'
                    : 'No reviewed'}
                  )
                </h4>

                <p>
                  <span>{movie.Actors}</span>
                </p>

                <div>
                  <p>Plot</p>
                  <p>{movie.Plot}</p>
                </div>

                <div>
                  <p>Director</p>
                  <p>{movie.Director}</p>
                </div>

                <div>
                  <p>Language</p>
                  <p>{movie.Language}</p>
                </div>

                <div>
                  <p>Awards</p>
                  <p>{movie.Awards}</p>
                </div>
              </div>
            </header>
            <ul>
              <li>
                <strong>{movie.Metascore}</strong>
                <span>Metascore</span>
              </li>
              <li>
                <strong>{movie.imdbRating}</strong>
                <span>IMDB Rating</span>
              </li>
              <li>
                <strong>{movie.imdbVotes}</strong>
                <span>IMDB Votes</span>
              </li>
            </ul>
          </MovieInfo>
        )}
      </Content>
      <ReviewActions>
        <div>
          <button type="button" onClick={() => {}}>
            <FaHeart />
          </button>
          <div />
          <button type="button" onClick={() => {}}>
            <FaHeartBroken />
          </button>
        </div>
      </ReviewActions>
    </Container>
  );
};

export default MovieReview;
