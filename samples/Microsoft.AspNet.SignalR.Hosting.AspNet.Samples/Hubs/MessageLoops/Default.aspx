﻿<%@ Page Title="ASP.NET SignalR: Message Loops Demo" Language="C#" MasterPageFile="~/SignalR.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Microsoft.AspNet.SignalR.Samples.Hubs.MesssagesLoops.Default" %>


<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <ul class="breadcrumb">
        <li><a href="<%: ResolveUrl("~/") %>">SignalR Samples</a> <span class="divider">/</span></li>
        <li class="active">Message Loops</li>
    </ul>

    <div class="page-header">
        <h2>Message Loops </h2>
        <p>Demonstrates Message Loops where client call the server method to broadcast message after the client successfully call the server method, and show missing and dup messages if happens.</p>
    </div>

    <p>
        <input type="button" id="startMessageLoops" value="Start Message Loops" />
    </p>

    <p>
        <button id="stopStart" class="btn btn-info btn-small" disabled="disabled"><i class="icon-stop icon-white"></i><span>Stop Connection</span></button>
    </p>

    <h5>Messages: </h5>
    <div id="messageLoops">
    </div>
    <label id="missingMessagesCount">
    </label>

    <ul id="messages">
    </ul>


</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="Scripts" runat="server">
    <script src="<%: ResolveUrl("~/signalr/hubs") %>"></script>
    <script src="MessageLoops.js"></script>
</asp:Content>
