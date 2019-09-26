"use strict"

import admin from './admin';
import statis from './statis'

export default app => {
  app.use('/admin', admin);
  app.use('/statis', statis);
}