import 'package:injectable/injectable.dart';
import 'package:invoicer_web/features/auth/data/model/sign_in_request_data.dart';
import 'package:invoicer_web/features/auth/data/model/sign_in_response_data.dart';
import 'package:invoicer_web/features/auth/domain/model/sign_in_request_model.dart';
import 'package:invoicer_web/features/auth/domain/model/sign_in_response_model.dart';

import '../../domain/repository/auth_repository.dart';
import '../datasource/auth_remote_datasource.dart';

@Injectable(as: AuthRepository)
class AuthRepositoryImpl implements AuthRepository {
  AuthRepositoryImpl(this.authRemoteDataSource);

  final AuthRemoteDataSource authRemoteDataSource;

  @override
  Future<SignInResponseModel> signIn(SignInRequestModel request) {
    return authRemoteDataSource
        .signIn(
          SignInRequestData(email: request.email, password: request.password),
        )
        .then((SignInResponseData data) {
          return SignInResponseModel(
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          );
        });
  }
}
