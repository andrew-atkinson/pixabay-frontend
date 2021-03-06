import axios from 'axios'
import KEY from '../../../APIKEY'

/* -----------------    ACTIONS     ------------------ */

const GET_IMAGES = 'GET_IMAGES'
const GET_MORE_IMAGES = 'GET_MORE_IMAGES'


/* ------------   ACTION CREATORS     ------------------ */

const getImages = (query) => ({type: GET_IMAGES, query})
const getMoreImages = (query) => ({type: GET_MORE_IMAGES, query})

/* ------------       REDUCER     ------------------ */

export default function reducer(state = {hits: [],  page: 1}, action) {
  switch (action.type) {
    case GET_IMAGES:
      return {
        ...state, 
        total: action.query.total,
        hits: action.query.hits
      }
    case GET_MORE_IMAGES:
      return {
        ...state, 
        total: action.query.total,
        hits: state.hits.concat(action.query.hits),
        page: action.query.page
      }
    default:
      return state
  }
}

/* ------------   THUNK CREATORS     ------------------ */

export const getImageQueryResults = query => dispatch => {
  axios.get(`https://pixabay.com/api/?key=${KEY}&q=${encodeURI(query.text)}&webformatURL='_960'&per_page=20&page=1`)
  .then(res => {
    dispatch(getImages({hits: res.data.hits, total: res.data.total}))
  })
}

export const getMoreImageQueryResults = query => dispatch => {
  axios.get(`https://pixabay.com/api/?key=${KEY}&q=${encodeURI(query.text)}&webformatURL='_960'&per_page=20&page=${query.page}`)
  .then(res => {
    dispatch(getMoreImages({hits: res.data.hits, total: res.data.total, page: query.page}))
  })
}