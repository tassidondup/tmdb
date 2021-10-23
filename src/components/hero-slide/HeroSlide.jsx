import React, {useEffect, useState} from 'react'
import './hero-slide.scss'
import tmdbApi, {category, movieType} from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'
import SwiperCore, {Autoplay} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import { useHistory } from 'react-router-dom'
import Button, {OutlineButton} from '../button/Button'

const HeroSlide = () => {

  SwiperCore.use(Autoplay)

  const [movieItems, setMovieItems] = useState([])

  useEffect(() => {
    const getMovies = async () => {
      const params = {page: 1}
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {params})
        console.log('popular movies', response)
        setMovieItems(response.results.slice(0, 4))
      } catch (error) {
        console.log('hero slide error', error)
      }
    }

    getMovies()
  }, [])

  return (
    <div className='hero-slide'>
      <Swiper modules={[Autoplay]} grabCursor={true} spaceBetween={0} slidesPerView={1} autoplay={{delay: 3000}}>
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({isActive}) => (
              // <img src={apiConfig.originalImage(item.backdrop_path)} alt='backdrop' />
              <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`}/>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

const HeroSlideItem = props => {
  let history = useHistory()
  const item = props.item
  const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)

  return (
    <div className={`hero-slide__item ${props.className}`} style={{backgroundImage: `url(${background})`}}>
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button onClick={() => history.push('/movie/' + item.id)}>
                Watch now
            </Button>
            <OutlineButton onClick={() => console.log('trailer')}>
              Watch trailer
            </OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt='poster' />
        </div>
      </div>
    </div>
  )
}

export default HeroSlide
