import { Module, DynamicModule } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    // const credentialPath:
    process.env.NODE_ENV === 'development'
      ? admin.initializeApp({
          credential: admin.credential.cert(
            'baby-bot-d8ef9-firebase-adminsdk-rpk2d-56e3c25a9b.json'
          ),
          databaseURL: 'https://baby-bot-d8ef9.firebaseio.com',
        })
      : admin.initializeApp();

    return {
      module: DatabaseModule,
      providers: [{ provide: 'Firestore', useValue: admin.firestore() }],
      exports: ['Firestore'],
    };
  }
}