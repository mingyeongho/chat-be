import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      context: ({ req, connection }: any) => {
        //graphql에게 request를 요청할때 req안으로 jwt토큰이 담깁니다.
        if (req) {
          //이부분이 처음 보시는 분들에게는 의아할 수 있습니다. graphql을 사용하면서 req.headers.authorization를 어떻게 담아서 보내는거지? 하실 수 있습니다. 해당 부분은 밑에 부분에서 설명하겠습니다.
          const user = req.headers.authorization;
          return { ...req, user };
        } else {
          return connection;
        }
      },
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
