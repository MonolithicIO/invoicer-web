import 'package:invoicer_web/features/auth/domain/model/sign_in_request_model.dart';
import 'package:invoicer_web/features/auth/domain/model/sign_in_response_model.dart';

abstract class AuthRepository {
  Future<SignInResponseModel> signIn(SignInRequestModel request);
}