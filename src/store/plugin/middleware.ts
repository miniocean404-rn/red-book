// 使得 redux 自动处理异步 action（因为  使用了 Redux-thunk 中间件之后，action 就不仅仅只是一个对象，可以是一个异步函数）
// Redux Toolkit 的 createAsyncThunk 可以替代 redux-thunk
import thunk from 'redux-thunk'
// import { createLogger } from 'redux-logger'

export const middleware = [thunk]
