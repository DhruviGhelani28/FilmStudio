from logging import exception
from operator import contains
# from typing_extensions import Required
from django.forms import ValidationError
from setuptools import Require
from . models import *
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from rest_framework import serializers, exceptions


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']

# class UserRegistrationSerializer(serializers.ModelSerializer):
#     """User registration serializer class"""
#     username = serializers.CharField(required=True,help_text="Enter your Username.")
#     email = serializers.CharField(required=True, help_text="Enter Your Email.")
#     name = serializers.CharField(required=True, help_text="Enter Your Name")

#     # first_name = serializers.CharField(required=True,help_text="Enter First your Name.")
#     # last_name = serializers.CharField(required=True,help_text="Enter Last your Name.")
#     role = serializers.CharField(required=True, help_text="Enter Your Roll.")
#     password = serializers.CharField(required=True, write_only=True, style={'input_type': 'password'},help_text="Enter your Password.")
#     confPassword = serializers.CharField(required=True, write_only=True, style={'input_type': 'password'},help_text="Enter your Confirm Password.")

#     class Meta:
#         model = User
#         fields = '__all__'
#         extra_kwargs ={
#             'is_active' :{
#                 'read_only':True
#             },
#             'is_superuser':{
#                 'read_only':True
#             },
#         }

#     def validate_password(self, password, confPassword):
#         if password == confPassword:
#             if password.length >= 6:
#                 if password.contains('@') :
#                     return password
#                 else:
#                     raise serializers.ValidationError('There must be numbers & "@" in password')
#             else:
#                 return serializers.ValidationError('Password must be of atleast 6 characters')
#         else:
#             raise serializers.ValidationError('Both Password Doesn\'t match')

#     def validate_email(self, email):
#         existing = User.object.filter(email=email).first()
#         if existing:
#             raise serializers.ValidationError('Someone with this username has already exist')
#         else:
#             if email.contains('@') and email.contains('.com'):
#                 return email
#             else:
#                 raise serializers.ValidationError('Please enter correct email id')

#     def validate_username(self, username):
#         existing = User.objects.filter(username = username).first()
#         if existing:
#             raise serializers.ValidationError('Someone with this username has already exists')
#         else:
#             if username.contains('_'):
#                 return username
#             else:
#                 raise serializers.ValidationError('Username must contain "_" ')

#     def get_user_email(self,email):
#         return email

#     def create(self, validated_data):
#         user = User.objects.create(
#             username =validated_data['username'],
#             email = validated_data['email'],
#             first_name = validated_data['first_name'],
#             last_name =validated_data['last_name'],
#             role = validated_data['role'],
#             password = make_password(validated_data.get('password')),
#             confPassword = make_password(validated_data.get('confPassword')),
#         )
#         return user


class AgencyProfileSerializer(serializers.ModelSerializer):
    # agency = UserSerializer(read_only =True)
    class Meta:
        model = Agency
        fields = ['id','agency','name','email','username','mobileNo','agencyName','agencyAddress','profile_image','location','social_website']

    # def create(self, validated_data):
    #     agencyProfile = Agency.objects.create(
    #         name = validated_data['name'],
    #         email = validated_data['email'],
    #         username = validated_data['username'],
    #         # role = validated_data['role'],
    #         mobileNo = validated_data['mobileNo'],
    #         agencyName = validated_data['agencyName'],
    #         agencyAddress = validated_data['agencyAddress'],
    #         profile_image = validated_data['profile_image'],
    #         location = validated_data['location'],
    #         social_website = validated_data['social_website'],
    #     )
    #     return agencyProfile


class CustomerProfileSerializer(serializers.ModelSerializer):
    # customer = UserRegistrationSerializer(read_only =True) 
    class Meta:
        model = Customer
        fields = ['id','customer','name','email','username','mobileNo','companyName','companyAddress','profile_image','location','social_website']

    # def create(self, validated_data):
    #     customerProfile = Customer.objects.create(
    #         name = validated_data['name'],
    #         email = validated_data['email'],
    #         username = validated_data['username'],
    #         # role = validated_data['role'],
    #         mobileNo = validated_data['mobileNo'],
    #         customerName = validated_data['customerName'],
    #         customerAddress = validated_data['customerAddress'],
    #         profile_image = validated_data['profile_image'],
    #         location = validated_data['location'],
    #         social_website = validated_data['social_website'],
    #     )
    #     return customerProfile


class SupplierProfileSerializer(serializers.ModelSerializer):
    # supplier = UserRegistrationSerializer(read_only =True)
    class Meta:
        model = Supplier
        fields = ['id', 'supplier', 'name', 'email','username','mobileNo', 'organisationName', 'organisationAddress','profile_image','location','social_website']

    # def create(self, validated_data):
    #     supplierProfile = Supplier.objects.create(
    #         name = validated_data['name'],
    #         email = validated_data['email'],
    #         username = validated_data['username'],
    #         # role = validated_data['role'],
    #         mobileNo = validated_data['mobileNo'],
    #         organizationName = validated_data['organizationName'],
    #         organizationAddress = validated_data['organizationAddress'],
    #         profile_image = validated_data['profile_image'],
    #         location = validated_data['location'],
    #         social_website = validated_data['social_website'],
    #     )
    #     return supplierProfile


class WorkerProfileSerializer(serializers.ModelSerializer):
    # worker = UserRegistrationSerializer(read_only =True)
    class Meta:
        model = Worker
        fields = ['id',"worker", "name","email","username","mobileNo","short_intro","address","profile_image","location"]

    # def create(self, validated_data):
    #     workerProfile = Agency.objects.create(
    #         name = validated_data['name'],
    #         email = validated_data['email'],
    #         username = validated_data['username'],
    #         # role = validated_data['role'],
    #         mobileNo = validated_data['mobileNo'],
    #         address = validated_data['address'],
    #         short_intro = validated_data['short_intro'],
    #         profile_image = validated_data['profile_image'],  
    #         location = validated_data['location'],   
    #     )
    #     return workerProfile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model= Profile
        fields = "__all__"

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model= Task
        fields = '__all__'
        
class PhotoPosterSerializer(serializers.ModelSerializer):
    class Meta:
        model= PhotoPoster
        fields = '__all__'

class ActorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model= Actor
        fields = ['id', "model","username","email", "name", "mobileNo","address","background","profile_image","salary", "nativePlace"]

# class GarmentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model= Garment
#         fields = ['id','garmentName', 'garmentImage','price','orderStatus','timeDuration','supplier']

class PremiseSerializer(serializers.ModelSerializer):
    class Meta:
        model= Premise
        fields = ["id","gadgetImage","gadgetName", "price","orderStatus","timeDuration","agency"]

class BillingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Billing 
        fields = '_all__'

class ActorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model= Actor
        fields = '__all__'
class OrderStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model=OrderStatus
        fields = ['name']
        
class PremiseSerializer(serializers.ModelSerializer):
    orderStatus = OrderStatusSerializer(many=False)
    class Meta:
        model = Premise
        fields = ['id','agency','premiseImage','itemName','price','timeDuration','orderStatus']

class PhotoPosterSerializer(serializers.ModelSerializer):
    orderStatus = OrderStatusSerializer(many=False)
    # print(orderStatus)
    class Meta:
        model= PhotoPoster
        fields = ['category','name','price','photoimage','orderStatus', 'timeDuration']

class GarmentSerializer(serializers.ModelSerializer):
    orderStatus = OrderStatusSerializer(many=False)
    class Meta:
        model= Garment
        fields = ['id','supplier', 'garmentName','garmentImage', 'price','timeDuration','orderStatus']



# class UserApprovalSerializer(serializers.ModelSerializer):
#     is_active = serializers.BooleanField(required=True)
#     username = serializers.CharField(required=True, write_only = True,help_text="Enter your Username.")
    
#     class Meta:
#         model = User
#         fields = ['id','is_activate','username','first_name','email']
#         extra_kwargs ={
#             'username':{
#                 'read_only':True
#             },
#             'first_name':{
#                 'read_only':True
#             },
#             'is_active':{
#                 'read_only':True
#             },
#             'email':{
#                 'read_only':True
#             },
#         }

#     def update(self, instance, validated_data):
#         if instance.username == validated_data['username']:
#             instance.is_active = validated_data['is_active']
#             instance.save()
#         else:
#             raise serializers.ValidationError('You are not right user')
        
#         return instance

class ChangePasswordSerializer(serializers.ModelSerializer):
    old_Password = serializers.CharField(write_only = True, required = True,style={'input_type': 'password'},help_text="Enter your old Password.") 
    new_Password = serializers.CharField(write_only = True, required = True,style={'input_type': 'password'},help_text="Enter your New Password.")
    conf_Password = serializers.CharField(write_only = True, required = True,style={'input_type': 'password'},help_text="Enter your Confirm Password.")

    class Meta:
        model = User
        fields = ['old_Password', 'new_Password','conf_Password']

    def validate(self,attrs):
        if attrs['new_password'] != attrs['conf_password']:
            raise serializers.ValidationError({"password":"Password fields doesn't match."})
        return attrs

    def validate_old_password(self,value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password":"Old password is not correct"})
        return value

    def update(self, instance, validated_data):
        if validated_data['new_Password'] == validated_data['conf_Password']:
            instance.set_password(validated_data['new_Password'])
        else:
            raise serializers.ValidationError(' Password fields doesn\'t match')
        return super().update(instance, validated_data)

class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required = True, help_text = "Enter username")
    password = serializers.CharField(required = True, help_text = "Enter password", style={'input':'password'}) 
    role = serializers.CharField(required=True,help_text = "Enter role")
    class Meta:
        model= User
        fields = ['email','role','password']
    def validate(self, attrs):
        user = authenticate(**attrs)
        if user:
            if user.is_active:
                attrs['user'] = user
                return attrs
            raise exceptions.AuthenticationFailed('Account is not active')
        raise exceptions.AuthenticationFailed()


# class EmailTokenObtainSerializer(TokenObtainSerializer):
#     username_field = User.EMAIL_FIELD


# class CustomTokenObtainPairSerializer(EmailTokenObtainSerializer):
#     @classmethod
#     def get_token(cls, user):
#         return RefreshToken.for_user(user)

#     def validate(self, attrs):
#         data = super().validate(attrs)

#         refresh = self.get_token(self.user)

#         data["refresh"] = str(refresh)
#         data["access"] = str(refresh.access_token)

# class EmailTokenObtainPairView(TokenObtainPairView):
#     serializer_class = CustomTokenObtainPairSerializer