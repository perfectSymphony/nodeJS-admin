"use strict"
import v1 from './v1';
import admin from './admin';
import statis from './statis'
import shopping from './shopping';

export default app => {
  app.use('/v1', v1);
  app.use('/admin', admin);
  app.use('/statis', statis);
  app.use('/shopping', shopping);
}