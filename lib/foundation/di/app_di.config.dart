// dart format width=80
// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// InjectableConfigGenerator
// **************************************************************************

// ignore_for_file: type=lint
// coverage:ignore-file

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'package:get_it/get_it.dart' as _i174;
import 'package:injectable/injectable.dart' as _i526;
import 'package:invoicer_web/features/auth/data/datasource/auth_remote_datasource.dart'
    as _i533;
import 'package:invoicer_web/features/auth/data/repository/auth_repository.dart'
    as _i55;
import 'package:invoicer_web/features/auth/domain/repository/auth_repository.dart'
    as _i742;
import 'package:invoicer_web/features/auth/presentation/screens/signin/sign_in_viewmodel.dart'
    as _i623;

extension GetItInjectableX on _i174.GetIt {
  // initializes the registration of main-scope dependencies inside of GetIt
  _i174.GetIt init({
    String? environment,
    _i526.EnvironmentFilter? environmentFilter,
  }) {
    final gh = _i526.GetItHelper(this, environment, environmentFilter);
    gh.factory<_i533.AuthRemoteDataSource>(
      () => _i533.AuthRemoteDataSourceImpl(),
    );
    gh.factory<_i742.AuthRepository>(
      () => _i55.AuthRepositoryImpl(gh<_i533.AuthRemoteDataSource>()),
    );
    gh.factory<_i623.SignInViewModel>(
      () => _i623.SignInViewModel(gh<_i742.AuthRepository>()),
    );
    return this;
  }
}
