
import json
from django.core.files import File
from urllib import request, response
import pathlib
import os
import datetime
# from pytest import console_main
from .models import *
from .models import Supplier, Customer, Worker, Agency
from .serializers import *
from rest_framework.views import APIView
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework import status, viewsets
from rest_framework_simplejwt.serializers import TokenObtainSerializer, TokenObtainPairSerializer
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
import glob
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.views import TokenViewBase
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError


# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [

        {'GET' : 'api/Users'},# available only for admin
        {'GET': 'api/Users/userId'},

        #for supplier
        {'GET' : 'api/Users/Suppliers'},
        {'GET' : 'api/Users/Suppliers/supplierId'},
        {'GET' : 'api/Users/Suppliers/supplierId/Tasks'},
        {'GET' : 'api/Users/Suppliers/supplierId/Tasks/taskId'},
        {'GET' : 'api/Users/Suppliers/supplierId/Bills'},
        {'GET' : 'api/Users/Suppliers/supplierId/Bills/billId'},

        #for agency
        {'GET' : 'api/Users/Agencies'},
        {'GET' : 'api/Users/Agencies/agencyId'},
        {'GET' : 'api/Users/Agencies/agencyId/Tasks'},
        {'GET' : 'api/Users/Agencies/agencyId/Tasks/taskId'},
        {'GET' : 'api/Users/Agencies/agencyId/Bills'},
        {'GET' : 'api/Users/Agencies/agencyId/Bills/billId'},

        #for customers
        {'GET' : 'api/Users/Customers'},
        {'GET' : 'api/Users/Customers/cutomerId'},
        {'GET' : 'api/Users/Customers/cutomerId/Tasks'},
        {'GET' : 'api/Users/Customers/cutomerId/Tasks/taskId'},
        {'GET' : 'api/Users/Customers/cutomerId/Bills'},
        {'GET' : 'api/Users/Customers/cutomerId/Bills/billId'},

        #for workers
        {'GET' : 'api/Users/Workers'},
        {'GET' : 'api/Users/Workers/workerId'},
        {'GET' : 'api/Users/Workers/workerId/Tasks'},
        {'GET' : 'api/Users/Workers/workerId/Tasks/taskId'},
        {'GET' : 'api/Users/Workers/workerId/Bills'},
        {'GET' : 'api/Users/Workers/workerId/Bills/billId'},
    ]
    return Response(routes)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many = True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def getUser(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)
   
@api_view(['POST'])
@permission_classes([AllowAny])
def UserRegistrationViewSet(request):
    print("\n\nRegister")
    data = request.data['data']
    print("\n\n\n", data)
    user = User.objects.create(
        username = data['username'],
        email = data['email']

    )
    user.set_password(data['password'])
    user.save()
    print("User", user)
    profile = Profile.objects.create(
        user= user,
        username = user.username,
        email = user.email,
        role = data['role']
    )
    print("Profile", profile)
    profile.save() 
    print("role:::", profile.role) 

    if data['role'] == "Supplier":
        supplier = Supplier.objects.create(
            supplier = user,
            username = user.username,
            email = user.email,
            name = data['fullname'],
            mobileNo = data['mobileNo'],
            organisationName = data['organizationName'],
            organisationAddress =  data['organizationAddress'],
            profile_image = data['profileImage'],
            location = data['location'],
            social_website =  data['socialWebsite'],
        )
        # supplier.profile_image.save(data['profileImage'], save=False)
        # print("-=-=-=-=-\n", supplier.profile_image)
        supplier.save()

    if data['role'] == 'Agency':
        agency= Agency.objects.create(
            agency = user,
            username = user.username,
            email = user.email,
            name = data['fullname'],
            mobileNo = data['mobileNo'],
            agencyName = data['agencyName'],
            agencyAddress =  data['agencyAddress'],
            profile_image = data['profileImage'],
            location = data['location'],
            social_website =  data['socialWebsite'],
        )
        agency.save()

    if data['role'] == 'Customer':
        customer = Customer.objects.create(
            customer = user,
            username = user.username,
            email = user.email,
            name = data['fullname'],
            mobileNo = data['mobileNo'],
            companyName = data['companyName'],
            companyAddress =  data['companyAddress'],
            profile_image = data['profileImage'],
            location = data['location'],
            social_website =  data['socialWebsite'],
        )
        customer.save()
        print("customer:: ",customer)

    if data['role'] == 'Worker':
        worker = Worker.objects.create(
            worker = profile,
            username = profile.username,
            email = profile.email,
            name = data['fullname'],
            mobileNo = data['mobileNo'],
            short_intro = data['shortIntro'],
            address =  data['address'],
            profile_image = data['profileImage'],
            location = data['location'],
           
        )
        worker.save()
        # workers = Worker.objects.all()
        print("Worker\n\n\n", worker)

    if data['role'] == 'Model':
        model = Actor.objects.create(
            model = profile,
            username = profile.username,
            email = profile.email,
            name = data['fullname'],
            mobileNo = data['mobileNo'],
            address =  data['address'],
            background = data['background'],
            profile_image = data['profileImage'],
            nativePlace = data['nativePlace'],
            salary = 0
        )
        model.save()
    
    serializer = UserSerializer(user, many = False)
    return Response(serializer.data)

@api_view(['POST'])
@csrf_exempt
@permission_classes([IsAuthenticated])
def UserLoginViewSet(request):
    data = request.data
    username = data['username']
    password = data['password']
    
    user = User.objects.get(username=username)
    profile = Profile.objects.get(username = username)
    role = profile.role
    data = {
        "role" : role,
        "password" : data
    }
    
    if user.check_password(password):
        return Response(data['role'])
    else:
        return Response(response.error.data)
    

class TaskView(APIView):

    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
    def getTasks(request):
        user = request.user.profile
        if user.role == "Supplier":
            tasks = Task.objects.filter(owner = user)
            serializer = TaskSerializer(tasks, many=True)
            return Response(serializer.data)

        elif user.role == "Agency":
        
            tasks = Task.objects.filter(owner = user)
            serializer = TaskSerializer(tasks, many=True)
            return Response(serializer.data)

        elif user.role == "Customer":
            
            tasks = Task.objects.filter(owner = user)
            serializer = TaskSerializer(tasks, many=True)
            return Response(serializer.data)

        elif user.role == "Worker":
        
            tasks = Task.objects.filter(owner = user)
            serializer = TaskSerializer(tasks, many=True)
            return Response(serializer.data)

        elif user.role == "Model":
            
            tasks = Task.objects.filter(owner = user)
            serializer = TaskSerializer(tasks, many=True)
            return Response(serializer.data)

        elif user.role == "Admin" :
            tasks = Task.objects.filter(owner = user)
            serializer = TaskSerializer(tasks, many=True)
            return Response(serializer.data)

    @api_view(['POST'])
    @permission_classes([IsAuthenticated])
    def addTask(request):
        # print(request.headers)
        user = request.user.profile
        data = request.data
        print(data)
        task = Task.objects.create(
            owner = user,
            role = Role.objects.get(name=user.role),
            # owner. = data['user'],
            name = data['taskName'],
            description = data['description'],
            date = data['dateTime'].split("T")[0],
            time = data['dateTime'].split("T")[1]
        )
        task.save()
        # print(data['datetime'].split("T")[0])
        serializer = TaskSerializer(task, many=False)
        return Response(serializer.data)
    
    @api_view(['DELETE'])
    @permission_classes([IsAuthenticated])
    def deleteTask(request, pk):
        user= request.user.profile
        print
        task = Task.objects.get(id=pk)
        task.delete()
        return Response({"message" : "task has deleted"})
        


class GadgetView(APIView):
    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
    def getGadgets(request):
        user = request.user.profile
        if user.role == "Admin":
            premises = Premise.objects.all()
            serializer = PremiseSerializer(premises, many=True)
            return Response(serializer.data)
        if user.role == "Agency":    
            agency = Agency.objects.get(agency = request.user)
            # garments = supplier.garment_set.all()
            premises = Premise.objects.filter(agency=agency)
           
            serializer = PremiseSerializer(premises, many= True)
            return Response(serializer.data)
        
    @api_view(['POST'])
    @permission_classes([IsAuthenticated])
    def addGadget(request):
        agency = request.user.agency
        data = request.data
        print("\n----------",data)
        gadget = Premise.objects.create(
            agency = agency,
            itemName = data['gadgetName'],
            premiseImage = data['gadgetImage'],
            price = data['price'],
            orderStatus = OrderStatus.objects.get(name = data['orderStatus']),
            timeDuration = data['timeDuration'],
            )
        print(gadget, gadget.premiseImage, gadget.orderstatus, gadget)
        gadget.save()
        serializer = PremiseSerializer(gadget, many=False)
        return Response(serializer.data)
    
    # @api_view(['GET'])
    # @permission_classes([IsAuthenticated])
    # def getGadget(request, pk):
    #     # agency = request.user.agency
    #     gadget = Premise.objects.get(id=pk)
    #     serializer = PremiseSerializer(gadget, many=False)
    #     return Response(serializer.data)
    
    @api_view(['PUT'])
    @permission_classes([IsAuthenticated])
    def editGadget(request, pk):
        gadget = Premise.objects.get(id=pk)
        data = request.data
        
        gadget.itemName = data['gadgetName']
        gadget.premiseImage = data['gadgetImage']
        gadget.price = data['price']
        gadget.orderStatus = OrderStatus.objects.get(name = data['orderStatus'])
        gadget.timeDuration = data['timeDuration']
        
        gadget.save()
        serializer = PremiseSerializer(gadget, many=False)
        return Response(serializer.data)
    
    @api_view(['DELETE'])
    @permission_classes([IsAuthenticated])
    def deleteGadget(request, pk):
        user= request.user.profile
        if user.role == "Agency" or user.role == "Admin":
            gadget = Premise.objects.get(id=pk)
            gadget.delete()
            return Response({"message" : "Gadget has deleted"})
            
        

class GarmentView(APIView):
    
    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
    def getGarments(request):
        user = request.user.profile
        if user.role == "Admin":
            garments = Garment.objects.all()
            serializer = GarmentSerializer(garments, many=True)
            return Response(serializer.data)
        if user.role == "Supplier":    
            supplier = Supplier.objects.get(supplier = request.user)
            # garments = supplier.garment_set.all()
            garments = Garment.objects.filter(supplier=supplier)
           
            serializer = GarmentSerializer(garments, many= True)
            return Response(serializer.data)
        
    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
    def getGarment(request, pk):
        garment = Garment.objects.get(id=pk)
        serializer = GarmentSerializer(garment, many=False)
        return Response(serializer.data)
        
    @api_view(['POST'])
    @permission_classes([IsAuthenticated])
    def addGarment(request):
        user = request.user.supplier
        data = request.data
        print("garment data ::: ",data)
        garment = Garment.objects.create(
            supplier = user,
            garmentName = data['garmentName'],
            garmentImage = data['garmentImage'],
            price = data['price'],
            orderStatus = OrderStatus.objects.get(name = data['orderStatus']),
            timeDuration = data['timeDuration']
        )
    
        garment.save()
        serializer = GarmentSerializer(garment, many=False)
        return Response(serializer.data)
    
    
    @api_view(['PUT'])
    @permission_classes([IsAuthenticated])
    def editGarment(request, pk):
        data = request.data
        garment = Garment.objects.get(id=pk)
        
        garment.garmentName = data['garmentName']
        garment.garmentImage = data['garmentImage']
        garment.price = data['price']
        garment.orderStatus = data['orderStatus']
        garment.timeDuration = data['timeDuration']
        
        garment.save()
        
        serializer = GarmentSerializer(garment, many=False)
        return Response(serializer.data)
    
    @api_view(['DELETE'])
    @permission_classes([IsAuthenticated])
    def deleteGarment(request,pk):
        user= request.user.profile
        if user.role == "Supplier" or user.role == "Admin":
            garment = Garment.objects.get(id=pk)
            garment.delete()
            return Response({"message" : "Garment has deleted"})
        
class SupplierView(APIView):
    # permission_classes=[IsAuthenticated]

    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
    def getSuppliers(request):
        user = request.user.profile
        # user = Profile.objects.get( username = user.username)
        print("user:: ", user)
        if user.role != 'Supplier':
            suppliers = Supplier.objects.all()
            serializer = SupplierProfileSerializer(suppliers, many=True)
            return Response(serializer.data)
        else:
            return Response({'message' : 'Sorry, You can\'t view Suppliers List because you are not owner nor permitted user'})

    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
    def getSupplier(request, pk):
        user = request.user.profile
        if user.role != "Supplier":
            supplier = Supplier.objects.get(id=pk)
            serializer = SupplierProfileSerializer(supplier, many=False)
            return Response(serializer.data)

    @api_view(['PUT'])
    @permission_classes([IsAuthenticated])
    def editSupplier(request, pk):
        data = request.data
        print("data",type(data['mobileNo']), data['mobileNo'])
        supplier = Supplier.objects.get(id=pk)
        
        filename= os.path.basename(data['profileImage'])
        print("=-=-supp\t\n",supplier,"\n", filename)
        
        supplier.username = data['username']
        supplier.email = data['email']
        supplier.name = data['fullname']
        supplier.mobileNo = data['mobileNo']
        supplier.organisationName = data['organizationName']
        supplier.organisationAddress =  data['organizationAddress']
        # supplier.profile_image = data['profileImage']
        supplier.location = data['location']
        supplier.social_website =  data['socialWebsite']
      
        print("\n mobileno-----supploier\t", supplier.mobileNo)
        supplier.save()

        serializer = SupplierProfileSerializer(supplier, many=False)
        print("supplier:---", supplier, "pk:--",pk )
        print("=-=-seri",serializer.data)
        return Response(serializer.data)

    @api_view(['GET'])
    @permission_classes([IsAuthenticated, IsAdminUser])
    def getSupplierTasks(request, pk):
        user = request.user
        supplier = Supplier.objects.get(id=pk)
        tasks = Task.objects.filter(owner = supplier)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    # @api_view(['GET'])
    # @permission_classes([IsAuthenticated])
    # def getSupplierBills(request, pk):
    #     user = request.user
    #     supplier = Supplier.objects.get(id=pk)
    #     bills = Billing.objects.filter(owner = supplier)
    #     serializer = BillingSerializer(bills, many=True)
    #     return Response(serializer.data)

    @api_view(['GET'])
    @permission_classes([IsAuthenticated, IsAdminUser])
    def getSupplierTask(request, pk, pk1):
        user = request.user
        supplier = Supplier.objects.get(id=pk)
        task = Task.objects.get(id=pk1, owner=supplier)
        serializer = TaskSerializer(task, many=False)
        return Response(serializer.data)

    # @api_view(['GET'])
    # @permission_classes([IsAuthenticated, IsAdminUser])
    # def getSupplierBill(request, pk, pk1):
    #     user = request.user
    #     supplier = Supplier.objects.get(id=pk)
    #     bill = Billing.objects.get(id=pk1, owner=supplier)
    #     serializer = BillingSerializer(bill, many=True)
    #     return Response(serializer.data)
    
    @api_view(['DELETE'])
    @permission_classes([IsAuthenticated])
    def deleteSupplier(request,pk):
        user= request.user.profile
        if user.role == "Admin":
            supplier = Supplier.objects.get(id=pk)
            supplier.delete()
            return Response({"message" : "Supplier has deleted"})

class AgencyView(APIView):

    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
    def getAgencies(request):
        user = request.user.profile
        if user.role != 'Agency':
            agencies = Agency.objects.all()
            serializer = AgencyProfileSerializer(agencies, many=True)
            return Response(serializer.data)
        else:
            return Response({'message' : 'Sorry, You can\'t view Agencies List because you are not owner nor permitted user'})

    @api_view(['GET'])
    @permission_classes([IsAuthenticated, IsAdminUser])
    def getAgency(request, pk):
        user = request.user.profile
        if user.role != "Agency":
            agency = Agency.objects.get(id=pk)
            serializer = AgencyProfileSerializer(agency, many=False)
            return Response(serializer.data)
        
    @api_view(['PUT'])
    @permission_classes([IsAuthenticated])
    def editAgency(request,pk):
        user=request.user.profile
        data = request.data 
        print("\n--------edit agency data\t",data, type(data['mobileNo']))
        if user.role == "Agecny" or user.role == "Admin":
            agency = Agency.objects.get(id=pk) 
            agency.username = data['username']
            agency.name = data['fullname']
            agency.email = data['email']
            agency.mobileNo = data['mobileNo']
            agency.agencyName = data['agencyName']
            agency.agencyAddress = data['agencyAddress']
            # agency.profile_image = data['profileImage']
            agency.location = data['location']
            agency.social_website = data['socialWebsite']
            agency.save()
            # print("\n----------save", agency.profile_image)
            
        serializer = AgencyProfileSerializer(agency, many=False)
        return Response(serializer.data)


    @api_view(['GET'])
    @permission_classes([IsAuthenticated, IsAdminUser])
    def getAgencyTasks(request, username):
        user = request.user
        agency = Agency.objects.get(username=username)
        tasks = Task.objects.filter(owner = agency)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    # @api_view(['GET'])
    # @permission_classes([IsAuthenticated])
    # def getAgencyBills(request, pk):
    #     user = request.user
    #     agency = Agency.objects.get(id=pk)
    #     bills = Billing.objects.filter(owner = agency)
    #     serializer = BillingSerializer(bills, many=True)
    #     return Response(serializer.data)

    @api_view(['GET'])
    @permission_classes([IsAuthenticated, IsAdminUser])
    def getAgencyTask(request, pk, pk1):
        user = request.user
        agency = Agency.objects.get(id=pk)
        task = Task.objects.get(id=pk1, owner=agency)
        serializer = TaskSerializer(task, many=True)
        return Response(serializer.data)

    # @api_view(['GET'])
    # @permission_classes([IsAuthenticated, IsAdminUser])
    # def getAgencyBill(request, pk, pk1):
    #     user = request.user
    #     agency = Agency.objects.get(id=pk)
    #     bill = Billing.objects.get(id=pk1, owner=agency)
    #     serializer = BillingSerializer(bill, many=True)
    #     return Response(serializer.data)
    
    @api_view(['DELETE'])
    @permission_classes([IsAuthenticated])
    def deleteAgency(request,pk):
        user= request.user.profile
        if user.role == "Admin":
            agency = Agency.objects.get(id=pk)
            agency.delete()
            return Response({"message" : "Agency has deleted"})


class CustomerView(APIView):

    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
    def getCustomers(request):
        user = request.user.profile
        if user.role != 'Customer':
            customers = Customer.objects.all()
            serializer = CustomerProfileSerializer(customers, many=True)
            return Response(serializer.data)
        else:
            return Response({'message' : 'Sorry, You can\'t view Customers List because you are not owner nor permitted user'})

    @api_view(['GET'])
    @permission_classes([IsAuthenticated, IsAdminUser])
    def getCustomer(request,pk):
        user = request.user.profile
        if user.role != "Customer":
            customer = Customer.objects.get(id=pk)
            serializer = CustomerProfileSerializer(customer, many=False)
            return Response(serializer.data)
        
    @api_view(['PUT'])
    @permission_classes([IsAuthenticated])
    def editCustomer(request,pk):
        user=request.user.profile
        data = request.data 
        print("\n--------edit customer data\t",data)
        if user.role == "Customer" or user.role == "Admin":
            print("\n--------enter")
            customer = Customer.objects.get(id=pk) 
            customer.username = data['username']
            customer.name = data['fullname']
            customer.email = data['email']
            customer.mobileNo = data['mobileNo']
            customer.companyName = data['companyName']
            customer.companyAddress = data['companyAddress']
            # customer.profile_image = data['profileImage']
            customer.location = data['location']
            customer.social_website = data['socialWebsite']
            customer.save()
            # print("\n----------save", customer.profile_image)
            
        serializer = CustomerProfileSerializer(customer, many=False)
        return Response(serializer.data)

    @api_view(['GET'])
    @permission_classes([IsAuthenticated, IsAdminUser])
    def getCustomerTasks(request, pk):
        user = request.user
        customer = Customer.objects.get(id=pk)
        tasks = Task.objects.filter(owner = customer)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    # @api_view(['GET'])
    # @permission_classes([IsAuthenticated])
    # def getCustomerBills(request, pk):
    #     user = request.user
    #     customer = Customer.objects.get(id=pk)
    #     bills = Billing.objects.filter(owner = customer)
    #     serializer = BillingSerializer(bills, many=True)
    #     return Response(serializer.data)

    @api_view(['GET'])
    @permission_classes([IsAuthenticated, IsAdminUser])
    def getCustomerTask(request, pk, pk1):
        user = request.user
        customer = Customer.objects.get(id=pk)
        task = Task.objects.get(id=pk1, owner=customer)
        serializer = TaskSerializer(task, many=True)
        return Response(serializer.data)

    # @api_view(['GET'])
    # @permission_classes([IsAuthenticated, IsAdminUser])
    # def getCustomerBill(request, pk, pk1):
    #     user = request.user
    #     customer = Customer.objects.get(id=pk)
    #     bill = Billing.objects.get(id=pk1, owner=customer)
    #     serializer = BillingSerializer(bill, many=True)
    #     return Response(serializer.data)
    
    @api_view(['DELETE'])
    @permission_classes([IsAuthenticated])
    def deleteCustomer(request,pk):
        user= request.user.profile
        if user.role == "Admin":
            customer = Customer.objects.get(id=pk)
            customer.delete()
            return Response({"message" : "Customer has deleted"})

class WorkerView(APIView):

    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
    def getWorkers(request):
        user = request.user.profile
        if user.role != 'Worker' :
            # profiles = Profile.objects.filter(role="Worker")
            workers = Worker.objects.all()
            serializer = WorkerProfileSerializer(workers, many=True)
            print(serializer.data)
            return Response(serializer.data)

    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
    def getWorker(request, pk):
        user = request.user.profile
        if user.role != "Worker":
            worker = Worker.objects.get(id=pk)
            serializer = WorkerProfileSerializer(worker, many=False)

            print("\n\n\n get worker call:---", worker, "\n\nid:---", pk)
            return Response(serializer.data)
        
    @api_view(['PUT'])
    @permission_classes([IsAuthenticated])
    def editWorker(request,pk):
        user=request.user.profile
        data = request.data 
        # file = request.Files
        print("\n--------edit worker data\t",data, data['profileImage'])
        if user.role == "Worker" or user.role == "Admin":
            print("\n---enetr")
            worker = Worker.objects.get(id=pk) 
            worker.username = data['username']
            worker.name = data['fullname']
            worker.email = data['email']
            worker.mobileNo = data['mobileNo']
            worker.short_intro = data['short_intro']
            worker.address = data['address']
            # worker.profile_image = data['profileImage']
            worker.location = data['location']
           
            worker.save()
            # worker.profile_image.save(data['profileImage'])
        print("\n-----------", worker.profile_image)
        serializer = WorkerProfileSerializer(worker, many=False)
        return Response(serializer.data) 
        

    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
    def getWorkerTasks(request, pk):
        user = request.user
        worker = Worker.objects.get(id=pk)
        tasks = Task.objects.filter(owner = worker)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    # @api_view(['GET'])
    # @permission_classes([IsAuthenticated])
    # def getWorkerBills(request, pk):
    #     user = request.user
    #     worker = Worker.objects.get(id=pk)
    #     bills = Billing.objects.filter(owner = worker)
    #     serializer = BillingSerializer(bills, many=True)
    #     return Response(serializer.data)

    @api_view(['GET'])
    @permission_classes([IsAuthenticated, IsAdminUser])
    def getWorkerTask(request, pk, pk1):
        user = request.user
        worker = Worker.objects.get(id=pk)
        task = Task.objects.get(id=pk1, owner=worker)
        serializer = TaskSerializer(task, many=True)
        return Response(serializer.data)

    # @api_view(['GET'])
    # @permission_classes([IsAuthenticated, IsAdminUser])
    # def getWorkerBill(request, pk, pk1):
    #     user = request.user
    #     worker = Worker.objects.get(id=pk)
    #     bill = Billing.objects.get(id=pk1, owner=worker)
    #     serializer = BillingSerializer(bill, many=True)
    #     return Response(serializer.data)
    
    @api_view(['DELETE'])
    @permission_classes([IsAuthenticated])
    def deleteWorker(request,pk):
        user= request.user.profile
        if user.role == "Admin":
            worker = Worker.objects.get(id=pk)
            worker.delete()
            return Response({"message" : "Worker has deleted"})


class TaskViewSet(viewsets.ModelViewSet):
    """" This is for model viewse class of tasks """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    # def getTasks(self, request , *args, **kwargs):
    #     user = request.user.profile
    #     if user.role == "Supplier":
    #         tasks = Task.objects.filter(role = "Supplier")
    #         serializer = TaskSerializer(tasks, many=True)
    #         return Response(serializer.data)

class ModelView(APIView):
    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
    def getModels(request):
        user = request.user.profile
        if user.role != 'Model':
            models = Actor.objects.all()
            serializer = ActorProfileSerializer(models, many=True)
            return Response(serializer.data)
        
    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
    def getModel(request, pk):
        user = request.user.profile
        print("\n------------call getmodel")
        if user.role != "Model":
            model = Actor.objects.get(id=pk)
            print("--h3")
            serializer = ActorProfileSerializer(model, many=False)
            print("model:---", model, "pk:--",pk )
            return Response(serializer.data)
        
    @api_view(['PUT'])
    @permission_classes([IsAuthenticated])
    def editModel(request,pk):
        user=request.user.profile
        data = request.data 
        print("\n--------edit model data\t",data)
        if user.role == "Model" or user.role == "Admin":
            model = Actor.objects.get(id=pk) 
            model.username = data['username']
            model.name = data['fullname'] 
            model.email = data['email']
            model.mobileNo = data['mobileNo']
            model.background = data['background']
            model.address = data['address']
            model.nativePlace = data['nativePlace']
            # model.profile_image = data['profileImage']
            print("\n-----",model.username,"----", model.mobileNo,"---",model.background, "--", model.email)
            model.salary = data['salary']
            model.save()
            # print("\n----------save", model.profile_image)
            
        serializer = ActorProfileSerializer(model, many=False)
        return Response(serializer.data)
    
    @api_view(['DELETE'])
    @permission_classes([IsAuthenticated])
    def deleteModel(request,pk):
        user= request.user.profile
        if user.role == "Admin":
            actor = Actor.objects.get(id=pk)
            actor.delete()
            return Response({"message" : "Actor has deleted"})

class PhotoPosterView(APIView):
    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
    def getPhotoPosters(request):
        user = request.user.profile

        photposters = PhotoPoster.objects.all()
        serializer = PhotoPosterSerializer(photposters, many=True)
        return Response(serializer.data)


  # print(os.path.abspath(p))

        # with open(os.path.abspath( ),"rb") as file:
        #     supplier.profile_image.save(data['profileImage'], save=False)
        # print("-=-=-=-=-\n", supplier.profile_image)