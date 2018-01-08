# frozen_string_literal: true

module Api
  module V1
    class UsersController < ::Api::V1::BaseController
      skip_authorization_check only: %i[signup confirm]
      before_action :authenticate_api_user!, except: %i[signup confirm check_email check_username]

      def current
        authorize! :read, current_user
        @user = current_user
      end

      def update
        authorize! :update, current_user

        @user = current_user
        return if @user.update(user_params)

        render json: ValidationError.new("update", @user.errors), status: :bad_request
      end

      def signup
        @user = User.new(user_params)

        return if @user.save

        render json: ValidationError.new("signup", @user.errors.messages), status: :bad_request
      end

      def confirm
        user = User.confirm_by_token(params[:token])
        if user.present? && user.errors.blank?
          render json: { code: 'confirmation', message: I18n.t('devise.confirmations.confirmed') }
        else
          render json: ValidationError.new("confirmation", user.errors), status: :bad_request
        end
      end

      def check_email
        authorize! :check, :users
        render json: { emailTaken: User.exists?(["lower(email) = :value", { value: (user_params[:email] || "").downcase }]) }
      end

      def check_username
        authorize! :check, :users
        render json: { usernameTaken: User.exists?(["lower(username) = :value", { value: (user_params[:username] || "").downcase }]) }
      end

      private def user_params
        @user_params ||= params.permit(
          :username, :email, :rsi_handle, :rsi_org,
          :password, :password_confirmation, :sale_notify
        )
      end
    end
  end
end
