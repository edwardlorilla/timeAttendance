<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Library Attendance System') }}</title>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/bundle.css') }}" rel="stylesheet">
</head>
<body>
<div id="app">
    <nav class="navbar navbar-static-top navbar-inverse">
        <div class="container">
            <div class="row">
                <div class="navbar-header">

                    <!-- Collapsed Hamburger -->
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#app-navbar-collapse">
                        <span class="sr-only">Toggle Navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>

                    <!-- Branding Image -->
                    <a class="navbar-brand" href="{{ url('/') }}">
                        {{ config('app.name', 'Library Attendance System') }}
                    </a>
                </div>

                <div class="collapse navbar-collapse text-center" id="app-navbar-collapse">
                    <!-- Left Side Of Navbar -->
                    <ul class="nav navbar-nav">
                        &nbsp;
                    </ul>


                    <!-- Right Side Of Navbar -->
                    <ul class="nav navbar-nav navbar-right ">
                        <!-- Authentication Links -->

                        @if (Auth::guest())
                            <li><a href="/view-profile">View Profile</a></li>
                            <li><a href="{{ route('login') }}">Login</a></li>
                            <li><a href="{{ route('register') }}">Register</a></li>
                        @else
                            <router-link tag="li" :to="{ name: 'eventLog' }"><a>Dashboard</a></router-link>
                            <router-link tag="li" :to="{ path: '/timelogs' }"><a>Time Logs</a></router-link>
                            <router-link tag="li" :to="{ path: '/view-profile' }"><a>View profile</a></router-link>

                            <li class="dropdown">
                                <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    Visitors
                                </a>

                                <ul class="dropdown-menu" role="menu">

                                    <router-link tag="li" :to="{ name: 'visitors' }"><a>Visitor Lists</a></router-link>
                                    <router-link tag="li" :to="{ name: 'reportVisitor' }"><a>Visitor Reports</a>
                                    </router-link>

                                </ul>
                            </li>
                            <div class="navbar-brand hidden-xs">
                                <a class="white-circle" href="index.php">
                                    <img alt="Logo" class="logo img-circle" src="mkd.png">
                                </a>
                            </div>
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                                   aria-expanded="false">
                                    {{ Auth::user()->name }} <span class="caret"></span>
                                </a>

                                <ul class="dropdown-menu" role="menu">

                                    <li>
                                        <a href="{{ route('logout') }}"
                                           onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                            Logout
                                        </a>

                                        <form id="logout-form" action="{{ route('logout') }}" method="POST"
                                              style="display: none;">
                                            {{ csrf_field() }}
                                        </form>
                                    </li>
                                </ul>
                            </li>

                        @endif
                    </ul>
                </div>
            </div>
        </div>
    </nav>
    <transition name="fade" mode="out-in" appear>
        @yield('content')
    </transition>
    <div id="footer">
        <div class="container">
            <p class="muted credit"><a href="https://github.com/edwardlorilla/timeAttendance">Copyright © 2018 MKD</a>.</p>
        </div>
    </div>
</div>

<!-- Scripts -->
<script src="{{ asset('js/app.js') }}"></script>
<script src="{{ asset('js/bundle.js') }}"></script>
<style type="text/css">
    /* Sticky footer styles
      -------------------------------------------------- */

    html,
    body {
        height: 100%;
        /* The html and body elements cannot have any padding or margin. */
    }

    /* Wrapper for page content to push down footer */
    #wrap {
        min-height: 100%;
        height: auto !important;
        height: 100%;
        /* Negative indent footer by it's height */
        margin: 0 auto -60px;
    }

    /* Set the fixed height of the footer here */
    #push,
    #footer {
        height: 60px;
    }
    #footer {
        background-color: #f5f5f5;
    }

    /* Lastly, apply responsive CSS fixes as necessary */
    @media (max-width: 767px) {
        #footer {
            margin-left: -20px;
            margin-right: -20px;
            padding-left: 20px;
            padding-right: 20px;
        }
    }
    .container {
        width: auto;
        max-width: 680px;
    }
    .container .credit {
        margin: 20px 0;
    }
</style>
</body>
</html>
