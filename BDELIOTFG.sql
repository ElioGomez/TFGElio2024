PGDMP                      |           Escuela    16.1    16.1 $    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16397    Escuela    DATABASE     |   CREATE DATABASE "Escuela" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE "Escuela";
                postgres    false            �            1259    32899    administradores    TABLE     �   CREATE TABLE public.administradores (
    dni character varying NOT NULL,
    pass character varying NOT NULL,
    edad integer,
    nombre character varying
);
 #   DROP TABLE public.administradores;
       public         heap    postgres    false            �            1259    16598    alumnos    TABLE     �   CREATE TABLE public.alumnos (
    dni character varying(9) NOT NULL,
    nombre character varying(255) NOT NULL,
    edad integer NOT NULL,
    dni_padre character varying(9) NOT NULL
);
    DROP TABLE public.alumnos;
       public         heap    postgres    false            �            1259    32839    alumnos_asignaturas    TABLE     �   CREATE TABLE public.alumnos_asignaturas (
    dni_alumno character varying(9) NOT NULL,
    nombre_asignatura character varying NOT NULL,
    curso integer NOT NULL,
    anyo integer NOT NULL,
    nota real
);
 '   DROP TABLE public.alumnos_asignaturas;
       public         heap    postgres    false            �            1259    32808 
   asignatura    TABLE     �   CREATE TABLE public.asignatura (
    nombre character varying(255) NOT NULL,
    descripcion character varying(255) NOT NULL,
    curso integer NOT NULL,
    anyo integer NOT NULL
);
    DROP TABLE public.asignatura;
       public         heap    postgres    false            �            1259    32874    mensajes    TABLE       CREATE TABLE public.mensajes (
    dni_padre character varying(20) NOT NULL,
    dni_alumno character varying(20) NOT NULL,
    dni_profesor character varying(20) NOT NULL,
    numero_mensaje integer NOT NULL,
    direccion boolean,
    texto character varying(255)
);
    DROP TABLE public.mensajes;
       public         heap    postgres    false            �            1259    16593    padres    TABLE     �   CREATE TABLE public.padres (
    dni character varying(9) NOT NULL,
    nombre character varying(255) NOT NULL,
    edad integer NOT NULL,
    email character varying(100),
    pass character varying(255)
);
    DROP TABLE public.padres;
       public         heap    postgres    false            �            1259    16586 
   profesores    TABLE     �   CREATE TABLE public.profesores (
    dni character varying(9) NOT NULL,
    nombre character varying(255) NOT NULL,
    edad integer NOT NULL,
    pass character varying(255) NOT NULL,
    email character varying(255)
);
    DROP TABLE public.profesores;
       public         heap    postgres    false            �            1259    32856    profesores_asignaturas    TABLE     �   CREATE TABLE public.profesores_asignaturas (
    dni_profesor character varying(9) NOT NULL,
    nombre_asignatura character varying NOT NULL,
    curso integer NOT NULL,
    anyo integer NOT NULL
);
 *   DROP TABLE public.profesores_asignaturas;
       public         heap    postgres    false            �          0    32899    administradores 
   TABLE DATA           B   COPY public.administradores (dni, pass, edad, nombre) FROM stdin;
    public          postgres    false    222   �-       �          0    16598    alumnos 
   TABLE DATA           ?   COPY public.alumnos (dni, nombre, edad, dni_padre) FROM stdin;
    public          postgres    false    217   G.       �          0    32839    alumnos_asignaturas 
   TABLE DATA           _   COPY public.alumnos_asignaturas (dni_alumno, nombre_asignatura, curso, anyo, nota) FROM stdin;
    public          postgres    false    219   -/       �          0    32808 
   asignatura 
   TABLE DATA           F   COPY public.asignatura (nombre, descripcion, curso, anyo) FROM stdin;
    public          postgres    false    218   H0       �          0    32874    mensajes 
   TABLE DATA           i   COPY public.mensajes (dni_padre, dni_alumno, dni_profesor, numero_mensaje, direccion, texto) FROM stdin;
    public          postgres    false    221   [1       �          0    16593    padres 
   TABLE DATA           @   COPY public.padres (dni, nombre, edad, email, pass) FROM stdin;
    public          postgres    false    216   x1       �          0    16586 
   profesores 
   TABLE DATA           D   COPY public.profesores (dni, nombre, edad, pass, email) FROM stdin;
    public          postgres    false    215   L2       �          0    32856    profesores_asignaturas 
   TABLE DATA           ^   COPY public.profesores_asignaturas (dni_profesor, nombre_asignatura, curso, anyo) FROM stdin;
    public          postgres    false    220   �2       D           2606    32907 $   administradores administradores_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.administradores
    ADD CONSTRAINT administradores_pkey PRIMARY KEY (dni);
 N   ALTER TABLE ONLY public.administradores DROP CONSTRAINT administradores_pkey;
       public            postgres    false    222            >           2606    32845 ,   alumnos_asignaturas alumnos_asignaturas_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.alumnos_asignaturas
    ADD CONSTRAINT alumnos_asignaturas_pkey PRIMARY KEY (nombre_asignatura, dni_alumno, curso, anyo);
 V   ALTER TABLE ONLY public.alumnos_asignaturas DROP CONSTRAINT alumnos_asignaturas_pkey;
       public            postgres    false    219    219    219    219            :           2606    16602    alumnos alumnos_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.alumnos
    ADD CONSTRAINT alumnos_pkey PRIMARY KEY (dni);
 >   ALTER TABLE ONLY public.alumnos DROP CONSTRAINT alumnos_pkey;
       public            postgres    false    217            <           2606    32814    asignatura asignatura_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.asignatura
    ADD CONSTRAINT asignatura_pkey PRIMARY KEY (nombre, curso, anyo);
 D   ALTER TABLE ONLY public.asignatura DROP CONSTRAINT asignatura_pkey;
       public            postgres    false    218    218    218            B           2606    32896    mensajes mensajes_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.mensajes
    ADD CONSTRAINT mensajes_pkey PRIMARY KEY (dni_padre, dni_alumno, dni_profesor, numero_mensaje);
 @   ALTER TABLE ONLY public.mensajes DROP CONSTRAINT mensajes_pkey;
       public            postgres    false    221    221    221    221            8           2606    16597    padres padres_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.padres
    ADD CONSTRAINT padres_pkey PRIMARY KEY (dni);
 <   ALTER TABLE ONLY public.padres DROP CONSTRAINT padres_pkey;
       public            postgres    false    216            @           2606    32862 2   profesores_asignaturas profesores_asignaturas_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.profesores_asignaturas
    ADD CONSTRAINT profesores_asignaturas_pkey PRIMARY KEY (nombre_asignatura, dni_profesor, curso, anyo);
 \   ALTER TABLE ONLY public.profesores_asignaturas DROP CONSTRAINT profesores_asignaturas_pkey;
       public            postgres    false    220    220    220    220            6           2606    16592    profesores profesores_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.profesores
    ADD CONSTRAINT profesores_pkey PRIMARY KEY (dni);
 D   ALTER TABLE ONLY public.profesores DROP CONSTRAINT profesores_pkey;
       public            postgres    false    215            F           2606    32851    alumnos_asignaturas fk_alumno    FK CONSTRAINT     �   ALTER TABLE ONLY public.alumnos_asignaturas
    ADD CONSTRAINT fk_alumno FOREIGN KEY (dni_alumno) REFERENCES public.alumnos(dni);
 G   ALTER TABLE ONLY public.alumnos_asignaturas DROP CONSTRAINT fk_alumno;
       public          postgres    false    217    219    4666            G           2606    32846 %   alumnos_asignaturas fk_asignatura_nom    FK CONSTRAINT     �   ALTER TABLE ONLY public.alumnos_asignaturas
    ADD CONSTRAINT fk_asignatura_nom FOREIGN KEY (nombre_asignatura, curso, anyo) REFERENCES public.asignatura(nombre, curso, anyo);
 O   ALTER TABLE ONLY public.alumnos_asignaturas DROP CONSTRAINT fk_asignatura_nom;
       public          postgres    false    219    218    218    218    219    219    4668            H           2606    32863 (   profesores_asignaturas fk_asignatura_nom    FK CONSTRAINT     �   ALTER TABLE ONLY public.profesores_asignaturas
    ADD CONSTRAINT fk_asignatura_nom FOREIGN KEY (nombre_asignatura, curso, anyo) REFERENCES public.asignatura(nombre, curso, anyo);
 R   ALTER TABLE ONLY public.profesores_asignaturas DROP CONSTRAINT fk_asignatura_nom;
       public          postgres    false    218    218    218    220    220    220    4668            E           2606    16603    alumnos fk_padre    FK CONSTRAINT     s   ALTER TABLE ONLY public.alumnos
    ADD CONSTRAINT fk_padre FOREIGN KEY (dni_padre) REFERENCES public.padres(dni);
 :   ALTER TABLE ONLY public.alumnos DROP CONSTRAINT fk_padre;
       public          postgres    false    216    4664    217            I           2606    32868 "   profesores_asignaturas fk_profesor    FK CONSTRAINT     �   ALTER TABLE ONLY public.profesores_asignaturas
    ADD CONSTRAINT fk_profesor FOREIGN KEY (dni_profesor) REFERENCES public.profesores(dni);
 L   ALTER TABLE ONLY public.profesores_asignaturas DROP CONSTRAINT fk_profesor;
       public          postgres    false    4662    215    220            J           2606    32885     mensajes mensaje_dni_alumno_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.mensajes
    ADD CONSTRAINT mensaje_dni_alumno_fkey FOREIGN KEY (dni_alumno) REFERENCES public.alumnos(dni);
 J   ALTER TABLE ONLY public.mensajes DROP CONSTRAINT mensaje_dni_alumno_fkey;
       public          postgres    false    4666    221    217            K           2606    32880    mensajes mensaje_dni_padre_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.mensajes
    ADD CONSTRAINT mensaje_dni_padre_fkey FOREIGN KEY (dni_padre) REFERENCES public.padres(dni);
 I   ALTER TABLE ONLY public.mensajes DROP CONSTRAINT mensaje_dni_padre_fkey;
       public          postgres    false    216    4664    221            L           2606    32890 "   mensajes mensaje_dni_profesor_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.mensajes
    ADD CONSTRAINT mensaje_dni_profesor_fkey FOREIGN KEY (dni_profesor) REFERENCES public.profesores(dni);
 L   ALTER TABLE ONLY public.mensajes DROP CONSTRAINT mensaje_dni_profesor_fkey;
       public          postgres    false    4662    215    221            �   8   x�����(�T��Tc��TCSs#����d��Tss��Dc�? ����� z�C      �   �   x�m�Kn�@D�Շ���c�?Ȗ"e������c���gH��"o9o��Z�_��q��H�*���Ǜ��!��e����:��6��s�q�(ml�-jT]Ӈ\�XZKxϋ��~j�ѥ�����SC���b���}��,�2)��|����!�Щކ�<�`�J�Ǭ�b�Y���О���;d#��6\r�cr��l�ҏ�p��������0�Z�      �     x�}��N�0���)|C?���]��^"i�	��'�/&�vjW��f�3a�t}r(���?ۏ�T%��& %�Yܥww�]�]x_��ߦ����jovbS�U�r��&h��e�(�P�Ez��k~H���o�/�ky&7�PP�6'�9x�PV@
���d��_�{�n�CH��&�I�����gd%��Pdh�8J��h���M	��sD�#�۷3ݩk�|�5�AEܷ�x.���h�ˁ���궙JO�u+��B9y�%�|����      �     x�m�AN�0E��)re8����`�Ɠ���4.N2��̒EW!#m4V�����|�`�t����E#�����^���Ÿ>�xb(����a��R��1������!:M\�>�hW��R�&�U�\h#��"xLӜH�2:�#f�ˋa0.�5��+��*y�i�~���Ja�q��Qg�ݻަo/�+��a
Ɂ���r0b�9���*�r�G%v�V��x��P�^B�Ĺ͗���q9�A�r^4�WM���X�      �      x������ � �      �   �   x���An�0����a���Ύ�Rڮz 6#b��QĦ�G�s��?��zϹW~��
�0�y*������ۣ�e;-2_7�� '�L)�6��ٹ��)��cLg��i/����р�\!�V�'�[�U�ڮ��"iU$P2��}V���(m_� �F�Ӿ�؁z��C#�5�I��buF��~�؃�M�Յ;�����i�x#C�      �   �   x����
�0E���cD����*�R�-�L��ƀ��/�����V�b�Op����[V����H��(��l�IA���y�%��>���
9�F*ԭ�/�~i�<��B���������ω�QỮ0,�@���{�|����F�g��c�.���?��Y4      �   �   x�3426153�����K�/�=��$39�Ӕ���Ȅ�.�R����yxs�����Hj�J,#�&��^Y�i�.�XT�
�
Dp��1F�,=�6I�
|8�2�s���M�4B���,.�/�DȘY�X�:r�&��B�U�i�.듚�^������ �HHh     